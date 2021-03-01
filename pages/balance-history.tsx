import axios from 'axios';
import { GetServerSideProps } from 'next';
import absoluteUrl from 'next-absolute-url';
import React from 'react';
import History from '../components/redesign/History';
import PageWrapper from '../components/redesign/PageWrapper';
import { getCookie } from '../lib/session';

interface IProps {
  submissions: any[];
  user: any;
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
      imageUri: '/static/img/redesign/logoUmbrellaOnly.svg',
    };
  });

  return {
    props: {
      submissions,
      userObj,
    },
  };
};
const GameHistory: React.FC<IProps> = (props: IProps) => {
  return (
    <PageWrapper
      active='Home'
      header='Games History'
      pageMode='modal'
      forceUnextended={true}>
      <History noHeader={true} games={props.submissions} />
    </PageWrapper>
  );
};

export default GameHistory;
