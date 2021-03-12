import { formatPrice, instance } from '../../lib/helpers';
import AdminDashboard from '../../components/admin/AdminDashboard';
import AdminPage from '../../hoc/adminPage';
import PropTypes from 'prop-types';
import React from 'react';
import Wrapper from '../../components/layout/Wrapper';
import absoluteUrl from 'next-absolute-url';

const Dashboard = ({
  entries,
  questions,
  payouts,
  users,
  totalWager,
  lostBets,
  pendingBets,
  wonBets,
  transactions,
  dayWagers,
  houseBalance,
}) => {
  const data = {
    title: 'Dashboard',
    header: 'Clouty By The Numbers',
    description: 'Dashboard',
  };
  return (
    <Wrapper data={data}>
      <div className='ma3 ma4-l'>
        <article className=' pa2 pa2-ns' data-name='slab-stat'>
          <dl className='dib mr5'>
            <dd className='f6 f5-ns b ml0'>Total Games</dd>
            <dd className='f3 f2-ns b ml0'>{questions.length}</dd>
          </dl>
          <dl className='dib mr5'>
            <dd className='f6 f5-ns b ml0'>Wins/Losses/Pending</dd>
            <dd className='f3 f2-ns b ml0'>
              {wonBets} - {lostBets} -{pendingBets}
            </dd>
          </dl>
          <dl className='dib mr5'>
            <dd className='f6 f5-ns b ml0'>Total Bets</dd>
            <dd className='f3 f2-ns b ml0'>{entries.length}</dd>
          </dl>
          <dl className='dib mr5'>
            <dd className='f6 f5-ns b ml0'>24-Hour Wagers</dd>
            <dd className='f3 f2-ns b ml0'>{formatPrice(dayWagers)}</dd>
          </dl>
          <dl className='dib mr5'>
            <dd className='f6 f5-ns b ml0'>House Balance</dd>
            <dd className='f3 f2-ns b ml0'>{formatPrice(houseBalance)}</dd>
          </dl>
          <dl className='dib mr5'>
            <dd className='f6 f5-ns b ml0'>Total Wagers</dd>
            <dd className='f3 f2-ns b ml0'>{formatPrice(totalWager)}</dd>
          </dl>
          <dl className='dib'>
            <dd className='f6 f5-ns b ml0'>Users</dd>
            <dd className='f3 f2-ns b ml0'>{users.length}</dd>
          </dl>
        </article>
        <div className='flex'>
          <a
            href='/dashboard/create'
            className='f6 mr2 link dim ph3 pv2 mb2 dib white bg-black'>
            Create Game
          </a>
          <a
            href='/dashboard/edit'
            className='f6 mr2 link dim ph3 pv2 mb2 dib white bg-black'>
            Manage Games
          </a>
          <a
            href='/dashboard/users'
            className='f6 mr2 link dim ph3 pv2 mb2 dib white bg-black'>
            Manage Users
          </a>
          <a
            href='/dashboard/users/games'
            className='f6 mr2 link dim ph3 pv2 mb2 dib white bg-black'>
            Manage User Submissions
          </a>
        </div>
        <AdminDashboard
          payouts={payouts}
          submissions={entries}
          transactions={transactions}
        />
      </div>
    </Wrapper>
  );
};

Dashboard.getInitialProps = async ({ req }) => {
  const { origin } = absoluteUrl(req);
  const apiURL = `${origin}`;

  const res = await instance.get(`${apiURL}/api/submissions`);
  const payoutsRes = await instance.get(`${apiURL}/api/allUserPayouts`);
  const questionsRes = await instance.get(`${apiURL}/api/questions`);
  const usersRes = await instance.get(`${apiURL}/api/users`, {
    headers: {
      Authorization: 'Bearer ' + process.env.API_KEY, //the token is a variable which holds the token
    },
  });
  const transactionsRes = await instance.get(`${apiURL}/api/transactions`);
  const payouts = payoutsRes.data;
  const questions = questionsRes.data;
  const transactions = transactionsRes.data;
  const users = usersRes.data;
  const entries = res.data;
  let yesterday = new Date().setDate(new Date().getDate() - 1);
  const wonWagers = entries
    .filter((curr) => curr.won && curr.userId)
    .reduce((acc, curr) => {
      return acc + curr.wager;
    }, 0);
  const totalWager = entries
    .filter((curr) => curr.userId)
    .reduce((acc, curr) => {
      return acc + curr.wager;
    }, 0);
  return {
    entries,
    questions,
    users,
    payouts,
    transactions,
    lostBets: entries.filter(
      (curr) => typeof curr.won === 'boolean' && !curr.won,
    ).length,
    dayWagers: entries
      .filter((curr) => new Date(curr.date) > yesterday)
      .reduce((acc, curr) => acc + curr.wager, 0),
    wonBets: entries.filter((curr) => curr.won).length,
    pendingBets: entries.filter((curr) => typeof curr.won === 'undefined')
      .length,
    totalWager,
    houseBalance: totalWager - wonWagers,
  };
};

Dashboard.propTypes = {
  entries: PropTypes.array,
  questions: PropTypes.array,
  payouts: PropTypes.array,
  transactions: PropTypes.array,
  users: PropTypes.array,
  totalWager: PropTypes.number,
  lostBets: PropTypes.number,
  wonBets: PropTypes.number,
  pendingBets: PropTypes.number,
  dayWagers: PropTypes.number,
  houseBalance: PropTypes.number,
};

export default AdminPage(Dashboard);
