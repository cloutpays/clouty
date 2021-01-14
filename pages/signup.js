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
    <div>
      <section className='signup-banner'>
        <img
          src='/static/img/new/signup-banner.jpg'
          width='100%'
          height='250'
        />
        <div className='card'>
          <div className='card-body text-center'>
            <h2>Hey There! 👋</h2>
            <p>Your free $2 credit is <br></br> waiting for you inside.</p>
            <button className='btn btn-default'>Claim Your Free Credit</button>
            <div className=''>
              <a href='#'>Credit Disclosure</a>
            </div>
          </div>
        </div>
      </section>
      <section className='signup-form'>
        <div className='signup-container'>
              <h1>Get started playing Clouty</h1>
              <p>
                Enjoy no fees on all bets for a limited time!
              </p>
              <LoginForm mode={'signup'} />
        </div>
      </section>
    </div>
  </Wrapper>
);

Login.getInitialProps = ({ isLoggedIn }) => {
  return { isLoggedIn };
};

export default Login;
