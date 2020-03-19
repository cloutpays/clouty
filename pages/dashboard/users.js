import { formatDate } from '../../lib/helpers';
import AdminPage from '../../hoc/adminPage';
import PropTypes from 'prop-types';
import React from 'react';
import Wrapper from '../../components/Wrapper';
import absoluteUrl from 'next-absolute-url';
import axios from 'axios';

const Dashboard = ({ users }) => {
  const data = {
    title: 'Dashboard',
    header: `Users By The Numbers`,
    description: 'Dashboard',
  };
  return (
    <Wrapper data={data}>
      <article className='pa2 pa2-ns' data-name='slab-stat'>
        <dl className='dib mr5'>
          <dd className='f6 f5-ns b ml0'>Total Users</dd>
          <dd className='f3 f2-ns b ml0'>{users.length}</dd>
        </dl>
      </article>

      <table className='f6 w-100 mw8 center' cellSpacing='0'>
        <thead>
          <tr>
            <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>Date</th>
            <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>Name</th>
            <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>
              Total Games Played
            </th>
            <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>Balance</th>
          </tr>
        </thead>
        <tbody className='lh-copy'>
          {users
            .sort((a, b) => {
              if (a.stripe.user.balance > b.stripe.user.balance) {
                return 1;
              }
              if (a.stripe.user.balance < b.stripe.user.balance) {
                return -1;
              }
              return 0;
            })
            .map((curr, ind) => {
              return (
                <tr key={ind}>
                  <td className='pv3 pr3 bb b--black-20' key='date'>
                    {formatDate(new Date(0).setUTCSeconds(curr.updatedAt))}
                  </td>
                  <td className='pv3 pr3 bb b--black-20' key='name'>
                    <a
                      className='no-underline dim black b'
                      href={`/dashboard/manage/${curr._id}`}>
                      {' '}
                      @{curr.info.userName}
                    </a>
                  </td>
                  <td className='pv3 pr3 bb b--black-20' key='question'>
                    {curr.submissions.length}
                    {/* <a
                      className='no-underline dim black b'
                      href={`/dashboard/edit/${curr.question}`}>
                      {curr.question}
                    </a> */}
                  </td>

                  <td className='pv3 pr3 bb b--black-20' key='wager'>{`$${curr
                    .stripe.user.balance / 100}`}</td>
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
  const submissionsRes = await axios.get(`${apiURL}/api/submissions`);
  const userRes = await axios.get(`${apiURL}/api/users`);
  const submissions = submissionsRes.data;
  const users = userRes.data.map((curr) => {
    return {
      ...curr,
      submissions: submissions.filter((sub) => sub.userId === curr._id),
    };
  });
  return {
    users,
    submissions,
  };
};

Dashboard.propTypes = {
  submissions: PropTypes.array,
  users: PropTypes.array,
};

export default AdminPage(Dashboard);
