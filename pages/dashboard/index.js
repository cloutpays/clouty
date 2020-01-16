import { formatDate } from '../../lib/helpers';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import Wrapper from '../../components/Wrapper';
import absoluteUrl from 'next-absolute-url';
import axios from 'axios';

const Dashboard = ({ entries }) => {
  const data = {
    title: 'Dashboard',
    header: 'User Submissions',
    description: 'Dashboard',
  };
  return (
    <Wrapper data={data}>
      <div className='mr2'>
        <a
          href='/dashboard/create'
          className='f6 link dim ph3 pv2 mb2 dib white bg-black'>
          Create Game
        </a>
        <Link href='/dashboard/edit'>
          <a
            href='/dashboard/edit'
            className='f6 link dim ph3 pv2 mb2 dib white bg-black'>
            Edit Game
          </a>
        </Link>
      </div>
      <table className='f6 w-100 mw8 center' cellSpacing='0'>
        <thead>
          <tr>
            <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>Date</th>
            <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>Name</th>
            <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>
              Email Address
            </th>
            <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>Game #</th>
            <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>Answer</th>
            <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>Wager</th>
          </tr>
        </thead>
        <tbody className='lh-copy'>
          {entries
            .map((curr, ind) => {
              return (
                <tr key={ind}>
                  <td className='pv3 pr3 bb b--black-20' key='date'>
                    {formatDate(new Date(curr.date || '2019-11-30'), 'full')}
                  </td>
                  <td className='pv3 pr3 bb b--black-20' key='name'>
                    {curr.name}
                  </td>
                  <td className='pv3 pr3 bb b--black-20' key='email'>
                    {curr.email}
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
  const res = await axios.get(`${apiURL}/api/submissions`);
  const entries = res.data;
  return { entries };
};

Dashboard.propTypes = {
  entries: PropTypes.array,
};

export default Dashboard;
