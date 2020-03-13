import { formatPrice } from '../../lib/helpers';
import AdminDashboard from '../../components/AdminDashboard';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import SecuredPage from '../../hoc/securedPage';
import Wrapper from '../../components/Wrapper';
import absoluteUrl from 'next-absolute-url';
import axios from 'axios';

const Dashboard = ({
  entries,
  questions,
  payouts,
  users,
  totalWager,
  lostBets,
  wonBets,
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
      <article className='pa2 pa2-ns' data-name='slab-stat'>
        <dl className='dib mr5'>
          <dd className='f6 f5-ns b ml0'>Total Games</dd>
          <dd className='f3 f2-ns b ml0'>{questions.length}</dd>
        </dl>
        <dl className='dib mr5'>
          <dd className='f6 f5-ns b ml0'>Wins/Losses</dd>
          <dd className='f3 f2-ns b ml0'>
            {wonBets} - {lostBets}
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
        <Link href='/dashboard/edit'>
          <a
            href='/dashboard/edit'
            className='f6 mr2 link dim ph3 pv2 mb2 dib white bg-black'>
            Manage Game
          </a>
        </Link>
      </div>
      <AdminDashboard payouts={payouts} submissions={entries} />
    </Wrapper>
  );
};

Dashboard.getInitialProps = async ({ req }) => {
  const { origin } = absoluteUrl(req);
  const apiURL = `${origin}`;
  const res = await axios.get(`${apiURL}/api/submissions`);
  const payoutsRes = await axios.get(`${apiURL}/api/allUserPayouts`);
  const payouts = payoutsRes.data;
  const questionsRes = await axios.get(`${apiURL}/api/questions`);
  const questions = questionsRes.data;
  const usersRes = await axios.get(`${apiURL}/api/users`);
  const users = usersRes.data;
  const entries = res.data;
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const wonWagers = entries
    .filter((curr) => curr.won)
    .reduce((acc, curr) => {
      return acc + curr.wager;
    }, 0);
  const totalWager = entries.reduce((acc, curr) => {
    return acc + curr.wager;
  }, 0);

  return {
    entries,
    questions,
    users,
    payouts,
    lostBets: entries.filter(
      (curr) => typeof curr.won === 'boolean' && !curr.won,
    ).length,
    dayWagers: entries
      .filter((curr) => new Date(curr.date) > yesterday)
      .reduce((acc, curr) => acc + curr.wager, 0),
    wonBets: entries.filter((curr) => curr.won).length,
    totalWager,
    houseBalance: totalWager - wonWagers,
  };
};

Dashboard.propTypes = {
  entries: PropTypes.array,
  questions: PropTypes.array,
  payouts: PropTypes.array,
  users: PropTypes.array,
  totalWager: PropTypes.number,
  lostBets: PropTypes.number,
  wonBets: PropTypes.number,
  dayWagers: PropTypes.number,
  houseBalance: PropTypes.number,
};

export default SecuredPage(Dashboard);
