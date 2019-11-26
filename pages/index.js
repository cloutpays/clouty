import React from 'react';
import Head from 'next/head';
import Nav from '../components/Nav';
import SignUp from '../components/SignUp';

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
      <link href="/static/styles.css" rel="stylesheet" />
    </Head>

    {/* <Nav /> */}
    <div className="hero">
      <h1 className="title">Welcome to Clouty!</h1>
      <p className="description">
        This is how it works....
        <br />
        <br />
        Every week, we will host contests with up to 3 questions about things
        happening currently in the rap game. <br />
        <br />
        This is a chance for you and your friends to put your intuition on the
        line! These questions will be regarding releases and predictions and we
        will use data and announcements to determine each weeks winners. <br />
        <br />
        Weekly earnings can either be cashed out or converted into clout tokens
        for future gameplay. Every contestant will be notified when the results
        are revealed.
      </p>
      <SignUp />
    </div>
  </div>
);

export default Home;
