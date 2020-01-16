import CreateGameForm from '../../../components/CreateGameForm';
import PropTypes from 'prop-types';
import React from 'react';
import Wrapper from '../../../components/Wrapper';
import absoluteUrl from 'next-absolute-url';
import axios from 'axios';
const Games = ({ game, questions }) => {
  const data = {
    title: 'Edit Game',
    header: 'Edit Game',
    description: 'Selected games and contests.',
  };

  return (
    <Wrapper data={data}>
      <CreateGameForm questions={questions} game={game} />
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
  return { questions, game: question[0] };
};

Games.propTypes = {
  games: PropTypes.array,
  questions: PropTypes.array,
  game: PropTypes.string,
};

export default Games;
