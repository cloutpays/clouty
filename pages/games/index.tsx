import { GetServerSideProps } from 'next';
import absoluteUrl from 'next-absolute-url';
import { useRouter } from 'next/router';
import React from 'react';
import BigHeader from '../../components/redesign/BigHeader';
import History from '../../components/redesign/History';
import PageWrapper from '../../components/redesign/PageWrapper';
import { instance } from '../../lib/helpers';

const contentful = require('contentful');

interface IProps {
  games: any[];
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { origin } = absoluteUrl(ctx.req);
  const apiURL = `${origin}`;

  // Getting active bets
  const res = await instance.get(`${apiURL}/api/questions`);
  const client = contentful.createClient({
    space: '74q51vemgz9l',
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  const images = (await client.getEntries({ content_type: 'game' })).items.map(
    (i: any) => ({
      id: i.fields.gameId,
      imageUrl: i.fields.image.fields.file.url,
    }),
  );

  const filter = ctx.query.filter;

  const games = res.data
    .filter(
      (game: any) => !filter || game.gameType === filter,
      //game.gameType === 'game' || game.gameType === 'fill-in-blank',
    )
    .reverse()
    .map((q: any) => {
      return {
        id: q.slug || '0',
        artist: q.title || '',
        description: q.description || '',
        date: q.date || '',
        imageUri:
          images.find((i: any) => i.id === q._id)?.imageUrl ||
          '/static/img/redesign/logoUmbrellaOnly.svg',
      };
    });

  return { props: { games } };
};

const Games: React.FC<IProps> = (props: IProps) => {
  const router = useRouter();
  return (
    <PageWrapper active='Our Active Bets' header='Games' pageMode='modal'>
      <BigHeader>Our Active Bets</BigHeader>
      <History
        noHeader={true}
        compact={true}
        games={props.games}
        onClickGame={(id: string) => router.push('/bet/step-one?id=' + id)}
      />
    </PageWrapper>
  );
};

export default Games;
