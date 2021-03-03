import {
  calculateTotalPayout,
  calculateTotalPayoutWithCredits,
  formatDate,
  formatPrice,
  formatPriceWithFractionDigits,
  instance
} from '../../../lib/helpers';
import AdminPage from '../../../hoc/adminPage';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Wrapper from '../../../components/layout/Wrapper';
import absoluteUrl from 'next-absolute-url';

const Dashboard = ({
  submissions,
  user,
  payouts,
  wonWagers,
  totalWager,
  lostBets,
  wonBets,
  pendingBets,
  stripe,
}) => {
  const data = {
    title: 'Dashboard',
    header: `${user.info.firstName} By The Numbers`,
    description: 'Dashboard',
  };

  const [balance, setBalance] = useState(user.stripe.user.balance / 100);
  const [creditBalance, setCreditBalance] = useState(
    user.stripe.user.credit / 100,
  );
  const setCredit = async () => {
    await instance
      .post(`/api/setCredit`, {
        data: {
          credit: {
            credit: creditBalance * 100,
            balance: balance * 100,
            userId: user._id,
          },
        },
      })
      .then(() => (window.location.href = `/dashboard/users`));
  };
  return (
    <Wrapper data={data}>
      <div className='ma3 ma4-l'>
        <h1 className='f2 lh-title fw9 mb2 mt0 pt3 bt bw2'>
          {user.info.firstName} {user.info.lastName}{' '}
          <span>{user.admin ? '(Admin)' : ''}</span>
        </h1>
        <h2 className='f3 mv0 mid-gray '>{user.email}</h2>
        <h2 className='f3 mv0 mid-gray'>{user.info.phoneNumber}</h2>
        <time className='f6 ttu mt2 tracked gray'>
          Last Login: {formatDate(new Date(0).setUTCSeconds(user.updatedAt))}
        </time>
        <article className='pa2 pa2-ns' data-name='slab-stat'>
          <dl className='dib mr5'>
            <dd className='f6 f5-ns b ml0'>Balance</dd>
            <dd className='f3 f2-ns b ml0'>
              {formatPrice(user.stripe.user.balance / 100)}
            </dd>
          </dl>
          <dl className='dib mr5'>
            <dd className='f6 f5-ns b ml0'>Credits</dd>
            <dd className='f3 f2-ns b ml0'>
              {formatPrice(user.stripe.user.credit / 100)}
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
        <div className='mv3'>
          <label className='db fw6 lh-copy f6' htmlFor='user-name'>
            Balance
          </label>
          <input
            className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-40'
            onChange={(event) => setBalance(event.currentTarget.value)}
            value={balance}
          />
        </div>
        <div className='mv3'>
          <label className='db fw6 lh-copy f6' htmlFor='user-name'>
            Credit
          </label>
          <input
            className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-40'
            onChange={(event) => setCreditBalance(event.currentTarget.value)}
            value={creditBalance}
          />
        </div>
        <div>
          <span
            onClick={setCredit}
            className='f6 mr2 noselect link dim ph3 pv2 mb2 dib white bg-black'>
            Set Balances
          </span>
        </div>

        <h2>Submitted Bets</h2>
        <table className='f6 w-100 mw8 center' cellSpacing='0'>
          <thead>
            <tr>
              <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>Date</th>
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
                      <a
                        className='no-underline dim black b'
                        href={`/dashboard/manage/${curr._id}`}>
                        {formatDate(new Date(curr.date))}
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
                      {curr.answer} {curr.odds && `(${curr.odds})`}
                    </td>
                    <td
                      className='pv3 pr3 bb b--black-20'
                      key='wager'>{`$${curr.wager}`}</td>
                    <td className='pv3 pr3 bb b--black-20' key='paid'>
                      {typeof curr.won === 'undefined' ? (
                        <span className='bg-gold ph1 mt2 fw8 f5 white'>P</span>
                      ) : curr.won ? (
                        <>
                          <span className='bg-green ph1 mt2 fw8 f5 white'>
                            W
                          </span>{' '}
                          <span className='pl1 sans-serif'>
                            → <span className='f6'>+</span>
                            {formatPriceWithFractionDigits(
                              curr.usedCredit
                                ? calculateTotalPayoutWithCredits(
                                    curr.odds,
                                    curr.wager,
                                  )
                                : calculateTotalPayout(curr.odds, curr.wager),
                            )}
                          </span>
                        </>
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
        <div className='mv3'>
          <h2>Payouts</h2>
          <table className='f6 w-100 mw8 center' cellSpacing='0'>
            <thead>
              <tr>
                <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>Date</th>
                <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>
                  Preferred
                </th>
                <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>
                  Amount
                </th>
                <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>
                  Cleared?
                </th>
              </tr>
            </thead>
            <tbody className='lh-copy'>
              {payouts
                .map((curr, ind) => {
                  return (
                    <tr key={ind}>
                      <td className='pv3 pr3 bb b--black-20' key='date'>
                        {formatDate(new Date(curr.date))}
                      </td>
                      <td className='pv3 pr3 bb b--black-20' key='date'>
                        <a
                          className='no-underline dim black b'
                          href={`/dashboard/manage/${curr.userId}`}>
                          {' '}
                          @{curr.handle}
                        </a>
                        <div>{curr.preferred}</div>
                        <div>
                          {curr.preferred === 'Apple Pay' && (
                            <>{curr.appleID}</>
                          )}
                          {curr.preferred === 'Cash App' && <>{curr.handle}</>}
                          {curr.preferred === 'PayPal' && <>{curr.email}</>}
                        </div>
                      </td>
                      <td className='pv3 pr3 bb b--black-20' key='date'>
                        {formatPrice(curr.amount)}
                      </td>
                      <td className='pv3 pr3 bb b--black-20' key='date'>
                        {curr.cleared ? (
                          <div className='f6 mr2 link dim ph3 pv2 mb2 dib fw6 white bg-green'>
                            Cleared
                          </div>
                        ) : (
                          <div className='f6 noselect mr2 link dim ph3 pv2 mb2 dib fw6 black bg-gold'>
                            Not Cleared
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
                .reverse()}
            </tbody>
          </table>
        </div>
        <div className='mv3'>
          <h2>Transactions</h2>
          <table className='f6 w-100 mw8 center' cellSpacing='0'>
            <thead>
              <tr>
                <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>Date</th>

                <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className='lh-copy'>
              {stripe
                .map((curr, ind) => {
                  return (
                    <tr key={ind}>
                      <td className='pv3 pr3 bb b--black-20' key='date'>
                        {formatDate(new Date(0).setUTCSeconds(curr.created))}
                      </td>
                      <td className='pv3 pr3 bb b--black-20' key='date'>
                        {formatPrice(curr.amount / 100)}
                      </td>
                    </tr>
                  );
                })
                .reverse()}
            </tbody>
          </table>
        </div>
      </div>
    </Wrapper>
  );
};

Dashboard.getInitialProps = async (ctx) => {
  const { query, req } = ctx;
  const { user } = query;
  const { origin } = absoluteUrl(req);
  const apiURL = `${origin}`;
  const submissionsRes = await instance.get(
    `${apiURL}/api/userSubmissions/${user}`,
  );
  const payoutsRes = await instance.get(`${apiURL}/api/userPayouts/${user}`);
  const payouts = payoutsRes.data;
  const stripeRes = await instance.get(`${apiURL}/api/userTransactions/${user}`);
  const stripe = stripeRes.data;
  const userRes = await instance.get(`${apiURL}/api/user/${user}`);
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
    stripe,
    payouts,
  };
};

Dashboard.propTypes = {
  submissions: PropTypes.array,
  payouts: PropTypes.array,
  stripe: PropTypes.array,
  user: PropTypes.object,
  wonWagers: PropTypes.number,
  wonBets: PropTypes.number,
  lostBets: PropTypes.number,
  pendingBets: PropTypes.number,
  totalWager: PropTypes.number,
};

export default AdminPage(Dashboard);
