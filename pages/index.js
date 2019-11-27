import React from 'react';
import Head from 'next/head';
import Nav from '../components/Nav';
import SignUp from '../components/SignUp';

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
      <link href='/static/styles.css' rel='stylesheet' />
    </Head>

    {/* <Nav /> */}
    <div className='hero'>
      <h1 className='title'>Welcome to Clouty!</h1>

      <SignUp />
    </div>
  </div>
);

export default Home;
