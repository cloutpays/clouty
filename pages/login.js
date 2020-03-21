import LoginForm from '../components/forms/LoginForm';
import React from 'react';
import Wrapper from '../components/layout/Wrapper';

const data = {
  description: 'Make money while putting your intuition on the line.',
  header: `The 🌎's first music betting platform.`,
};
const Login = () => (
  <div>
    <Wrapper data={data}>
      <LoginForm mode={'login'} />
    </Wrapper>
  </div>
);

Login.getInitialProps = ({ isLoggedIn }) => {
  return { isLoggedIn };
};

export default Login;
