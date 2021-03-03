import axios from 'axios';
import { GetServerSideProps } from 'next';
import absoluteUrl from 'next-absolute-url';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import History from '../components/redesign/History';
import BalanceBox from '../components/redesign/home/BalanceBox';
import FeaturedBets from '../components/redesign/home/FeaturedBets';
import * as El from '../components/redesign/home/styles';
import UserAvatar from '../components/redesign/home/UserAvatar';
import PageWrapper from '../components/redesign/PageWrapper';
import { getCookie } from '../lib/session';

const contentful = require('contentful');

interface IProps {
  userInfo: any;
  balance: number;
  credit: number;
  questions: any[];
  payouts: any[];
  submissions: any[];
  userAvatar: string;
  avatarUpdateUrl: string;
  userObj: any;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { origin } = absoluteUrl(ctx.req);
  const apiURL = `${origin}`;

  // Getting user info
  const user = getCookie('id_token', ctx.req);

  if (!user) {
    // Redirect logged out users to login page
    ctx.res.setHeader('Location', '/login');
    ctx.res.statusCode = 302;
    ctx.res.end();
  }

  const userRes = await axios.get(`${apiURL}/api/user/${user}`);
  const userObj = userRes.data;
  const balance = (userObj?.stripe?.user?.balance ?? 0) / 100;
  const credit = (userObj?.stripe?.user?.credit ?? 0) / 100;

  // Getting active bets
  /*
  const res = await axios.get(`${apiURL}/api/questions`);
  const questions = res.data.filter(
    (game: any) =>
      game.gameType === 'game' || game.gameType === 'fill-in-blank',
  );
  */

  // Getting featured bets - contentful
  const client = contentful.createClient({
    space: '74q51vemgz9l',
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
  });

  const questions = await client
    .getEntries({ content_type: 'latestPost' })
    .then((entries: any) => {
      const { items } = entries;
      return items
        .filter((item: any) => item.fields.number)
        .slice(0, 3)
        .map((item: any) => ({
          id: item.fields.number || 0,
          label: item.fields.description || '',
          imageUri: item.fields.image?.fields?.file?.url
            ? 'https:' + item.fields.image.fields.file.url
            : null,
        }));
    });

  // Getting transactions data
  // const transactions = await axios.get(`${apiURL}/api/userPayouts/${user}`);

  // Getting payouts data
  const payoutsRes = await axios.get(`${apiURL}/api/userPayouts/${user}`);
  const payouts = payoutsRes.data.slice(0, 5).map((p: any, index: number) => ({
    id: index,
    operation: 'Payout',
    description: p.preferred,
    date: p.date,
    amount: p.amount,
  }));

  // Getting images for submission data
  const images: any[] = (
    await client.getEntries({ content_type: 'game' })
  ).items.map((i: any) => ({
    id: i.fields.gameId,
    imageUrl: i.fields.image.fields.file.url,
  }));

  // Getting submissions data
  const submissionsRes = await axios.get(
    `${apiURL}/api/userSubmissions/${user}`,
  );
  const submissions = submissionsRes.data.map((sub: any) => {
    return {
      id: sub._id || '',
      artist: sub.title || (sub.question ? `Game #${sub.question}` : 'Game'),
      description: '',
      bet: sub.answer || '',
      date: sub.date || new Date(),
      credits: sub.wager,
      imageUri:
        images.find((i) => i.id === sub.question)?.imageUrl ||
        '/static/img/redesign/logoUmbrellaOnly.svg',
    };
  });

  return {
    props: {
      userInfo: userObj.info,
      userAvatar: userObj.avatar || '',
      balance,
      credit,
      questions,
      payouts,
      submissions,
      avatarUpdateUrl: `${apiURL}/api/setAvatar/${user}`,
      userObj,
    },
  };
};

const Home: React.FC<IProps> = (props: IProps) => {
  const { userInfo, questions, payouts, submissions, userAvatar } = props;
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [avatar, setAvatar] = useState(userAvatar);
  const router = useRouter();

  const updateAvatar = () => {
    fileInputRef.current?.click();
  };

  const onUpdateAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      axios({
        method: 'POST',
        url: props.avatarUpdateUrl,
        data: { avatar: reader.result },
      });
      setAvatar(reader.result as string);
    };
    // reader.onerror = (error) => console.log('Image upload error:', error);
  };

  return (
    <PageWrapper
      showUserGreeting={true}
      active='Home'
      userName={userInfo.firstName + ' ' + userInfo.lastName}>
      <El.UserInfoBox>
        <UserAvatar base64={avatar} onClick={updateAvatar} />
        <input
          type='file'
          style={{ display: 'none' }}
          name='avatar'
          ref={fileInputRef}
          onChange={onUpdateAvatar}
        />
        <BalanceBox
          balance={props.balance.toFixed(2)}
          credit={props.credit.toFixed(0)}
          onAdd={() => router.push('/add-to-balance')}
        />
      </El.UserInfoBox>
      <El.FeaturedBetsBox>
        <El.SectionHeader>
          <El.SectionHeaderText>Weeks Featured Bets</El.SectionHeaderText>
          <El.SeeAllButton onClick={() => router.push('/games')}>
            See All
          </El.SeeAllButton>
        </El.SectionHeader>
        <FeaturedBets
          categories={[
            { label: 'Over/Under', filter: 'game' },
            { label: 'Prop bet', filter: 'fill-in-blank' },
            { label: "Grammy's", filter: 'normal' },
          ]}
          bets={questions}
          onClickCategory={(filter) => router.push('/games?filter=' + filter)}
          onCreateBet={() => router.push('/games/create')}
          onVisitBet={(id: string) => router.push('/bet/step-one?id=' + id)}
        />
        <El.HistorySections>
          <El.HistoryBox>
            <History
              games={submissions.slice(0, 5)}
              onClickMore={() => router.push('/game-history')}
            />
          </El.HistoryBox>
          <El.HistoryBox>
            <History
              balance={payouts.slice(0, 5)}
              onClickMore={() => router.push('/balance-history')}
            />
          </El.HistoryBox>
        </El.HistorySections>
      </El.FeaturedBetsBox>
    </PageWrapper>
  );
};

export default Home;
