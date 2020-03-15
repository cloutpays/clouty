import App from 'next/app';
import Head from 'next/head';
import React from 'react';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <script src='https://js.stripe.com/v3/' />
          <link
            rel='stylesheet'
            href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
          />
        </Head>
        <Component {...pageProps} />
      </>
    );
  }
}

export default MyApp;
