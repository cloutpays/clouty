import LoginForm from '../components/forms/LoginForm';
import React from 'react';
import Wrapper from '../components/layout/Wrapper';

const data = {
  description: 'Make money while putting your intuition on the line.',
};
const Login = () => (
  <Wrapper data={data}>
    <div className='ma3 ma4-l'>
      <h2 className='tc f2 fw9 mv0'>Welcome</h2>
      <img src='/static/img/clouty-04.png' className='h4 center db  mt2' />
      <h3 className='tc f3 fw6'>Have an account with us?</h3>
      <LoginForm mode={'login'} />
    </div>
  </Wrapper>
);

Login.getInitialProps = ({ isLoggedIn }) => {
  return { isLoggedIn };
};

export default Login;
