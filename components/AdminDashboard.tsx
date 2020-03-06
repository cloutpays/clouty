import PropTypes from 'prop-types';
import React from 'react';
import { formatDate, formatPrice } from '../lib/helpers';

interface SubmissionsProps {
  submissions: any;
  payouts: any;
}

const AdminDashboard: React.FC<SubmissionsProps> = ({
  submissions,
  payouts,
}) => {
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
              <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>Paid?</th>
            </tr>
          </thead>
          <tbody className='lh-copy'>
            {payouts.map((curr: any, ind: number) => {
              return (
                <tr key={ind}>
                  <td className='pv3 pr3 bb b--black-20' key='date'>
                    {formatDate(new Date(curr.date))}
                  </td>
                  <td className='pv3 pr3 bb b--black-20' key='date'>
                    {curr.preferred}
                  </td>
                  <td className='pv3 pr3 bb b--black-20' key='date'>
                    {formatPrice(curr.amount)}
                  </td>
                  <td className='pv3 pr3 bb b--black-20' key='date'>
                    {curr.cleared ? (
                      'Cleared'
                    ) : (
                      <div className='f6 mr2 link dim ph3 pv2 mb2 dib white bg-black'>
                        Cleared
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className='mv3'>
        <h2>Submissions</h2>

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
              .map((curr: any, ind: number) => {
                return (
                  <tr key={ind}>
                    <td className='pv3 pr3 bb b--black-20' key='date'>
                      {formatDate(new Date(curr.date || '2019-11-30'))}
                    </td>
                    <td className='pv3 pr3 bb b--black-20' key='name'>
                      {curr.name}
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
                      {curr.won === 'undefined' ? (
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
