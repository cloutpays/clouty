import { getCookie } from '../../../lib/session';
import AdminPage from '../../../hoc/adminPage';
import CreateGameForm from '../../../components/forms/CreateGameForm';
import PropTypes from 'prop-types';
import React from 'react';
import Wrapper from '../../../components/layout/Wrapper';
import absoluteUrl from 'next-absolute-url';
import axios from 'axios';

const Games = ({ game, questions, submissions, houseBalance, userId }) => {
  const data = {
    title: 'Manage Game',
    header: 'Manage Game',
    description: 'Selected games and contests.',
  };

  return (
    <Wrapper data={data}>
      <CreateGameForm
        questions={questions}
        game={game}
        submissions={submissions}
        houseBalance={houseBalance}
        userId={userId}
      />
    </Wrapper>
  );
};

Games.getInitialProps = async ({ query, req }) => {
  const { game } = query;
  const { origin } = absoluteUrl(req);
  const apiURL = `${origin}`;
  const [
    { data: question },
    { data: questions },
    { data: submissions },
  ] = await Promise.all([
    axios.get(`${apiURL}/api/question/${game}`),
    axios.get(`${apiURL}/api/questions`),
    axios.get(`${apiURL}/api/gameSubmissions/${game}`),
  ]);
  const userId = getCookie('id_token', req);
  const houseBalance = submissions.reduce((acc, curr) => {
    return acc + curr.wager;
  }, 0);
  return { game: question[0], questions, submissions, userId, houseBalance };
};

Games.propTypes = {
  game: PropTypes.object,
  games: PropTypes.array,
  questions: PropTypes.array,
  submissions: PropTypes.array,
  userId: PropTypes.string,
  houseBalance: PropTypes.number,
};

export default AdminPage(Games);
