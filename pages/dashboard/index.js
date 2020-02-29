import AdminDashboard from '../../components/AdminDashboard';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import SecuredPage from '../../hoc/securedPage';
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
      <AdminDashboard submissions={entries} />
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

export default SecuredPage(Dashboard);
