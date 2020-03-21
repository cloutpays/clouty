import { styles } from '../constants/styles';
import DisclaimerModal from '../components/DisclaimerModal';
import LoginForm from '../components/forms/LoginForm';

import React from 'react';
import Wrapper from '../components/layout/Wrapper';

const data = {
  description: 'Make money while putting your intuition on the line.',
  header: `Start Playing Clouty`,
};
const Login = () => (
  <div>
    <Wrapper data={data}>
      <p className={styles.paragraph}>
        Sign up today to receive a free $5 credit towards your bets.
      </p>
      <DisclaimerModal />
      <LoginForm mode={'signup'} />
    </Wrapper>
  </div>
);

Login.getInitialProps = ({ isLoggedIn }) => {
  return { isLoggedIn };
};

export default Login;
