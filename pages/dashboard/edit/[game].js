import { getCookie } from '../../../lib/session';
import AdminPage from '../../../hoc/adminPage';
import CreateGameForm from '../../../components/forms/CreateGameForm';
import PropTypes from 'prop-types';
import React from 'react';
import Wrapper from '../../../components/layout/Wrapper';
import absoluteUrl from 'next-absolute-url';
import axios from 'axios';

const Games = ({ game, questions, userId }) => {
  const data = {
    title: 'Edit Game',
    header: 'Edit Game',
    description: 'Selected games and contests.',
  };

  return (
    <Wrapper data={data}>
      <CreateGameForm questions={questions} game={game} userId={userId} />
    </Wrapper>
  );
};

Games.getInitialProps = async ({ query, req }) => {
  const { game } = query;
  const { origin } = absoluteUrl(req);
  const apiURL = `${origin}`;
  const question = await (await axios.get(`${apiURL}/api/question/${game}`))
    .data;
  const questions = await (await axios.get(`${apiURL}/api/questions`)).data;
  const userId = getCookie('id_token', req);
  return { game: question[0], questions, userId };
};

Games.propTypes = {
  game: PropTypes.object,
  games: PropTypes.array,
  questions: PropTypes.array,
  userId: PropTypes.string,
};

export default AdminPage(Games);
