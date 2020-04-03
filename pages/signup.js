import { styles } from '../constants/styles';
import DisclaimerModal from '../components/DisclaimerModal';
import LoginForm from '../components/forms/LoginForm';
import classnames from 'classnames';

import React from 'react';
import Wrapper from '../components/layout/Wrapper';

const data = {
  description: 'Make money while putting your intuition on the line.',
  header: `Start Playing Clouty`,
};
const Login = () => (
  <Wrapper data={data}>
    <div className='ma3 ma4-l'>
      <p className={styles.paragraph}>
        Sign up today and receive a free $2 credit towards your bets.
      </p>
      <p className={styles.paragraph}>
        Also, for a limited time enjoy
        <span className={classnames('i b')}> no fees </span> for all bets!
      </p>
      <DisclaimerModal />
      <LoginForm mode={'signup'} />
    </div>
  </Wrapper>
);

Login.getInitialProps = ({ isLoggedIn }) => {
  return { isLoggedIn };
};

export default Login;
