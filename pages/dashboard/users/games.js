import GameTable from '../../../components/GameTable';
import PropTypes from 'prop-types';
import React from 'react';
import SecuredPage from '../../../hoc/securedPage';
import Wrapper from '../../../components/Wrapper';
import absoluteUrl from 'next-absolute-url';
import axios from 'axios';

const ManageUserGame = ({ games }) => {
  const data = {
    title: 'Dashboard',
    header: 'Manage User Games',
    description: 'Dashboard',
  };
  return (
    <Wrapper data={data}>
      <GameTable games={games} />
    </Wrapper>
  );
};

ManageUserGame.getInitialProps = async ({ req }) => {
  const { origin } = absoluteUrl(req);
  const apiURL = `${origin}`;
  const res = await axios.get(`${apiURL}/api/users/questions`);
  const games = await res.data;
  return { games };
};

ManageUserGame.propTypes = {
  games: PropTypes.array,
};

export default SecuredPage(ManageUserGame);
