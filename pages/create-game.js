import CreateGameForm from '../components/CreateGameForm';
import PropTypes from 'prop-types';
import React from 'react';
import SecuredPage from '../hoc/securedPage';
import Wrapper from '../components/Wrapper';
import absoluteUrl from 'next-absolute-url';
import axios from 'axios';

const CreateUserGame = ({ questions }) => {
  const data = {
    title: 'Dashboard',
    header: 'Create Game',
    description: 'Dashboard',
  };
  return (
    <Wrapper data={data}>
      <CreateGameForm questions={questions} isUserSubmission={true} />
    </Wrapper>
  );
};

CreateUserGame.getInitialProps = async ({ req }) => {
  const { origin } = absoluteUrl(req);
  const apiURL = `${origin}`;
  const res = await axios.get(`${apiURL}/api/questions`);
  const questions = await res.data;
  return { questions };
};
CreateUserGame.propTypes = {
  questions: PropTypes.array,
};

export default SecuredPage(CreateUserGame);
