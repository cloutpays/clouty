import { formatDate, formatPrice } from '../../../lib/helpers';
import AdminPage from '../../../hoc/adminPage';
import PropTypes from 'prop-types';
import React from 'react';
import Wrapper from '../../../components/Wrapper';
import absoluteUrl from 'next-absolute-url';
import axios from 'axios';

const Dashboard = ({
  submissions,
  user,
  wonWagers,
  totalWager,
  lostBets,
  wonBets,
  pendingBets,
}) => {
  const data = {
    title: 'Dashboard',
    header: `${user.info.firstName} By The Numbers`,
    description: 'Dashboard',
  };
  return (
    <Wrapper data={data}>
      <article className='pa2 pa2-ns' data-name='slab-stat'>
        <dl className='dib mr5'>
          <dd className='f6 f5-ns b ml0'>Balance</dd>
          <dd className='f3 f2-ns b ml0'>
            {formatPrice(user.stripe.user.balance / 100)}
          </dd>
        </dl>
        <dl className='dib mr5'>
          <dd className='f6 f5-ns b ml0'>Wins/Losses/Pending</dd>
          <dd className='f3 f2-ns b ml0'>
            {wonBets} - {lostBets} - {pendingBets}
          </dd>
        </dl>
        <dl className='dib mr5'>
          <dd className='f6 f5-ns b ml0'>Total Bets</dd>
          <dd className='f3 f2-ns b ml0'>{submissions.length}</dd>
        </dl>
        <dl className='dib mr5'>
          <dd className='f6 f5-ns b ml0'>Winnings</dd>
          <dd className='f3 f2-ns b ml0'>{formatPrice(wonWagers)}</dd>
        </dl>
        <dl className='dib mr5'>
          <dd className='f6 f5-ns b ml0'>Total Wagers</dd>
          <dd className='f3 f2-ns b ml0'>{formatPrice(totalWager)}</dd>
        </dl>
      </article>

      <table className='f6 w-100 mw8 center' cellSpacing='0'>
        <thead>
          <tr>
            <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>Date</th>
            <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>Name</th>
            <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>Game #</th>
            <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>Answer</th>
            <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>Wager</th>
            <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>Result</th>
          </tr>
        </thead>
        <tbody className='lh-copy'>
          {submissions
            .map((curr, ind) => {
              return (
                <tr key={ind}>
                  <td className='pv3 pr3 bb b--black-20' key='date'>
                    {formatDate(new Date(curr.date))}
                  </td>
                  <td className='pv3 pr3 bb b--black-20' key='name'>
                    <a
                      className='no-underline dim black b'
                      href={`/dashboard/manage/${curr.userId}`}>
                      {' '}
                      @{curr.handle}
                    </a>
                  </td>
                  <td className='pv3 pr3 bb b--black-20' key='question'>
                    <a
                      className='no-underline dim black b'
                      href={`/dashboard/edit/${curr.question}`}>
                      {curr.question}
                    </a>
                  </td>
                  <td className='pv3 pr3 bb b--black-20' key='answer'>
                    {curr.answer}
                  </td>
                  <td
                    className='pv3 pr3 bb b--black-20'
                    key='wager'>{`$${curr.wager}`}</td>
                  <td className='pv3 pr3 bb b--black-20' key='paid'>
                    {typeof curr.won === 'undefined' ? (
                      <span className='bg-gold ph1 mt2 fw8 f5 white'>P</span>
                    ) : curr.won ? (
                      <span className='bg-green ph1 mt2 fw8 f5 white'>W</span>
                    ) : (
                      <span className='bg-red ph1 mt2 fw8 f5 white'>L</span>
                    )}
                  </td>
                </tr>
              );
            })
            .reverse()}
        </tbody>
      </table>
    </Wrapper>
  );
};

Dashboard.getInitialProps = async ({ req }) => {
  const { origin } = absoluteUrl(req);
  const apiURL = `${origin}`;
  const user = req.url.split('/')[3];
  const submissionsRes = await axios.get(
    `${apiURL}/api/userSubmissions/${user}`,
  );
  const userRes = await axios.get(`${apiURL}/api/user/${user}`);
  const userObj = userRes.data;
  const submissions = submissionsRes.data;
  const wonWagers = submissions
    .filter((curr) => curr.won)
    .reduce((acc, curr) => {
      return acc + curr.wager;
    }, 0);

  const totalWager = submissions.reduce((acc, curr) => {
    return acc + curr.wager;
  }, 0);

  return {
    user: userObj,
    lostBets: submissions.filter(
      (curr) => typeof curr.won === 'boolean' && !curr.won,
    ).length,
    pendingBets: submissions.filter((curr) => typeof curr.won === 'undefined')
      .length,
    wonBets: submissions.filter((curr) => curr.won).length,
    totalWager,
    wonWagers,
    submissions,
  };
};

Dashboard.propTypes = {
  submissions: PropTypes.array,
  user: PropTypes.object,
  wonWagers: PropTypes.number,
  wonBets: PropTypes.number,
  lostBets: PropTypes.number,
  pendingBets: PropTypes.number,
  totalWager: PropTypes.number,
};

export default AdminPage(Dashboard);
