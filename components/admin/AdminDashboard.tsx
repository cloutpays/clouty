import axios from 'axios';
import Router from 'next/router';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { formatDate, formatPrice } from '../../lib/helpers';

interface SubmissionsProps {
  submissions: any;
  payouts: any;
}

const AdminDashboard: React.FC<SubmissionsProps> = ({
  submissions,
  payouts,
}) => {
  const [sort, setSort] = useState<string>('');

  const clearRequest = async (request: any) => {
    request.cleared = true;
    await axios({
      method: 'post',
      url: '/api/payout',
      data: { data: { payoutRequest: { ...request, cleared: true } } },
    }).then(() => {
      Router.push('/dashboard');
    });
  };

  return (
    <div>
      <div className='mv3'>
        <h2>Payouts</h2>
        <table className='f6 w-100 mw8 center' cellSpacing='0'>
          <thead>
            <tr>
              <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>Date</th>
              <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>
                Preferred
              </th>
              <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>Amount</th>
              <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>Amount</th>
            </tr>
          </thead>
          <tbody className='lh-copy'>
            {payouts
              .map((curr: any, ind: number) => {
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
                        {curr.preferred === 'Apple Pay' && <>{curr.appleID}</>}
                        {curr.preferred === 'Cash App' && <>{curr.handle}</>}
                        {curr.preferred === 'PayPal' && <>{curr.email}</>}
                      </div>
                    </td>
                    <td className='pv3 pr3 bb b--black-20' key='date'>
                      {formatPrice(curr.amount)}
                    </td>
                    <td className='pv3 pr3 bb b--black-20' key='date'>
                      {curr.cleared ? (
                        <div className='f6 mr2 link dim ph3 pv2 mb2 dib white bg-green'>
                          Cleared
                        </div>
                      ) : (
                        <div
                          className='f6 noselect mr2 link dim ph3 pv2 mb2 dib white bg-yellow'
                          onClick={() => clearRequest(curr)}>
                          Clear
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
        <h2>Submissions</h2>

        <table className='f6 w-100 mw8 center' cellSpacing='0'>
          <thead>
            <tr>
              <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>
                {' '}
                <a className='noselect' onClick={() => setSort('')}>
                  Date
                </a>
              </th>
              <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>Name</th>
              <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>Game #</th>
              <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>Answer</th>
              <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>
                <a className='noselect' onClick={() => setSort('wager')}>
                  <div>
                    <span>Wager</span>
                    <span>
                      <svg
                        width='.5cm'
                        height='.5cm'
                        viewBox='0 0 400 400'
                        xmlns='http://www.w3.org/2000/svg'
                        version='1.1'>
                        <rect
                          x='1'
                          y='1'
                          width='398'
                          height='398'
                          fill='none'
                        />
                        <path
                          d='M 100 100 L 300 100 L 200 300 z'
                          fill='black'
                        />
                      </svg>
                    </span>
                  </div>
                </a>
              </th>
              <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>
                {' '}
                <a className='noselect' onClick={() => setSort('result')}>
                  Result
                </a>
              </th>
            </tr>
          </thead>
          <tbody className='lh-copy'>
            {submissions
              .sort((a: any, b: any) => {
                switch (sort) {
                  case 'wager':
                    if (a.wager > b.wager) {
                      return 1;
                    }
                    if (a.wager < b.wager) {
                      return -1;
                    }
                    return 0;
                  case 'result':
                    if (a.won && !b.won) {
                      return 1;
                    }
                    if (!a.won && b.won) {
                      return -1;
                    }
                    return 0;
                }
                return 0;
              })
              .map((curr: any, ind: number) => {
                return (
                  <tr key={ind}>
                    <td className='pv3 pr3 bb b--black-20' key='date'>
                      {formatDate(new Date(curr.date || '2019-11-30'))}
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
                      {curr.question}
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
      </div>
    </div>
  );
};

AdminDashboard.defaultProps = {
  submissions: PropTypes.array,
  payouts: PropTypes.array,
};

export default AdminDashboard;
