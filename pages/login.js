import LoginForm from '../components/forms/LoginForm';
import React from 'react';
import Wrapper from '../components/layout/Wrapper';

const data = {
  description: 'Make money while putting your intuition on the line.',
  ignoreWrapper: true,
};
const Login = () => (
  <Wrapper data={data}>
    <div className='login-page'>
      <div className='login-container'>
        <div className='login-banner-content login-content-mobile'>
          <h1>Log In</h1>
          <p style={{ color: '#692699' }}>Welcome back to Clouty</p>
          <LoginForm mode={'login'} />
        </div>
        <section className='login-top-banner-right-mobile'>
          <div className='row'>
            <div className='col-md-12 p-0'>
              <img
                className='background-banner-image-mobile'
                src='/static/img/new/banner-right-mobile.jpg'
              />
            </div>
          </div>
        </section>
      </div>
      <div className='login-background-banner-image d-none d-sm-none d-md-block'>
        <img src='/static/img/new/banner-right-mobile.jpg' />
      </div>
    </div>
  </Wrapper>
);

Login.getInitialProps = ({ isLoggedIn }) => {
  return { isLoggedIn };
};

export default Login;
