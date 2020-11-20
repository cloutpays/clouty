import LoginForm from '../components/forms/LoginForm';
import React from 'react';
import Wrapper from '../components/layout/Wrapper';

const data = {
  description: 'Make money while putting your intuition on the line.',
};
const Login = () => (
  <Wrapper data={data}>
    <div className='container'>
      <div className='row'>
        <div className='col-md-6'>
          <div className='banner-content pl-5 pr-5'>
            <h1>Log In</h1>
            <p style={{ color: '#692699' }}>Welcome back to Clouty</p>
            <LoginForm mode={'login'} />
          </div>
        </div>
      </div>
      <img
        className='background-banner-image'
        src='/static/img/new/banner-right.jpg'
        width='528'
      />
    </div>
  </Wrapper>
);

Login.getInitialProps = ({ isLoggedIn }) => {
  return { isLoggedIn };
};

export default Login;
