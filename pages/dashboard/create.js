import AdminPage from '../../hoc/adminPage';
import CreateGameForm from '../../components/forms/CreateGameForm';
import PropTypes from 'prop-types';
import React from 'react';
import Wrapper from '../../components/layout/Wrapper';
import absoluteUrl from 'next-absolute-url';
import axios from 'axios';

const CreateGame = ({ questions }) => {
  const data = {
    title: 'Dashboard',
    header: 'Create Game',
    description: 'Dashboard',
  };
  return (
    <Wrapper data={data}>
      <CreateGameForm questions={questions} />
    </Wrapper>
  );
};

CreateGame.getInitialProps = async ({ req }) => {
  const { origin } = absoluteUrl(req);
  const apiURL = `${origin}`;
  const res = await axios.get(`${apiURL}/api/questions`);
  const questions = await res.data;
  return { questions };
};
CreateGame.propTypes = {
  questions: PropTypes.array,
};

export default AdminPage(CreateGame);
