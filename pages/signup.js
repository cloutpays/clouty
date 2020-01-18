import LoginForm from '../components/LoginForm';
import React from 'react';
import Wrapper from '../components/Wrapper';

const data = {
  description: 'Make money while putting your intuition on the line.',
  header: `The 🌎's first music betting platform.`,
};
const Login = () => (
  <div>
    <Wrapper data={data} className='measure-wide'>
      <LoginForm mode={'signup'} />
    </Wrapper>
  </div>
);

Login.getInitialProps = ({ isLoggedIn }) => {
  return { isLoggedIn };
};

export default Login;
