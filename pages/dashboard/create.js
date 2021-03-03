import { getCookie } from '../../lib/session';
import { instance } from '../../lib/helpers';
import AdminPage from '../../hoc/adminPage';
import CreateGameForm from '../../components/forms/CreateGameForm';
import PropTypes from 'prop-types';
import React from 'react';
import Wrapper from '../../components/layout/Wrapper';
import absoluteUrl from 'next-absolute-url';

const CreateGame = ({ questions, userId }) => {
  const data = {
    title: 'Dashboard',
    header: 'Create Game',
    description: 'Dashboard',
  };
  return (
    <Wrapper data={data}>
      <CreateGameForm questions={questions} userId={userId} />
    </Wrapper>
  );
};

CreateGame.getInitialProps = async ({ req }) => {
  const { origin } = absoluteUrl(req);
  const apiURL = `${origin}`;
  const res = await instance.get(`${apiURL}/api/questions`);
  const questions = await res.data;
  const userId = getCookie('id_token', req);
  return { questions, userId };
};
CreateGame.propTypes = {
  questions: PropTypes.array,
  userId: PropTypes.string,
};

export default AdminPage(CreateGame);
