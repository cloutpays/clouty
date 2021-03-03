import { GetServerSideProps } from 'next';
import absoluteUrl from 'next-absolute-url';
import React from 'react';
import History from '../components/redesign/History';
import PageWrapper from '../components/redesign/PageWrapper';
import { instance } from '../lib/helpers';
import { getCookie } from '../lib/session';

interface IProps {
  payouts: any[];
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

  const userRes = await instance.get(`${apiURL}/api/user/${user}`);
  const userObj = userRes.data;

  // Getting payouts data
  const payoutsRes = await instance.get(`${apiURL}/api/userPayouts/${user}`);
  const payouts = payoutsRes.data.map((p: any, index: number) => ({
    id: index || '0',
    operation: 'Payout',
    description: p.preferred || '',
    date: p.date || new Date(),
    amount: p.amount || 0,
  }));

  return {
    props: {
      payouts,
      userObj,
    },
  };
};
const GameHistory: React.FC<IProps> = (props: IProps) => {
  return (
    <PageWrapper
      active=''
      header='Balance History'
      pageMode='modal'
      forceUnextended={true}>
      <History noHeader={true} balance={props.payouts} />
    </PageWrapper>
  );
};

export default GameHistory;
