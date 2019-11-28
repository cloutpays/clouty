import React from 'react';
import Head from 'next/head';
import SignUpForm from '../components/SignUpForm.tsx';

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
      <link href='/static/styles.css' rel='stylesheet' />
    </Head>
    <div className='hero'>
      <h1 className='title'>Welcome to Clouty!</h1>
      <SignUpForm />
    </div>
  </div>
);

export default Home;
