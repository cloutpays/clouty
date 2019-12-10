import Head from 'next/head';
import React from 'react';
import SignUpForm from '../components/SignUpForm.tsx';

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
      <link href='/static/styles.css' rel='stylesheet' />
    </Head>
    <>
      <h1 className='title'>Welcome to Clouty!</h1>
      <br />
      <div className='header'>How does it work?</div>
      <p className='description'>
        <br />
        Make money while putting your intuition on the line! <br />
        <br />
        Weekly contest about the latest releases and predictions in the rap
        game.
        <br />
        <br />
        Every contestant will be notified on the results and you can earn cash
        or tokens to use on future games.
      </p>
      <div className='header'>Select your game</div>
      <SignUpForm />
    </>
  </div>
);

export default Home;
