import { getCookieFromBrowser } from '../../lib/session';
import { initGA, logPageView } from '../../lib/helpers';
import { styles } from '../../constants/styles';
import Footer from './Footer';
import Head from 'next/head';
import NProgress from 'nprogress';
import Navigation from './Navigation';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Router from 'next/router';

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

export default class Wrapper extends Component {
  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }

  renderHeader() {
    if (this.props.data.header) {
      return (
        <header className={`${styles.wrapper}`}>
          <div className='mt5 mb4'>
            <h2 className={`${styles.h2}`}>{this.props.data.header}</h2>
          </div>
        </header>
      );
    }
    return null;
  }

  renderHomePageHeader() {
    if (this.props.data.home_page) {
      return (
        <div>
          <div>
            <img
              className='banner-line-vertical'
              src='/static/img/new/line-vertical.jpg'
            />
            <div className='background-banner-image'>
              <img src='/static/img/new/banner-right.jpg' />
            </div>
            <img
              className='background-mobile-image'
              src='/static/img/new/mobile-frame1.png'
            />
          </div>
          <div className='heading-container'>
            <div>
              <div className='banner-content'>
                <p>Welcome to Clouty</p>
                <h1>
                  The 🌎&apos;s first music <br></br> betting platform.
                </h1>
                <div>
                  <span>
                    We host live bets about the latest releases and predictions
                    in music. Sign up <br></br> today and receive a free $2
                    credit towards your bets and no fees for all bets!
                  </span>
                </div>
                <a href='/signup'>
                  <button className='btn btn-default'>Sign Up</button>
                </a>
                <a href='/login'>
                  <button className='btn btn-default login-mobile'>
                    Log In
                  </button>
                </a>
              </div>
            </div>
            <div></div>
            <section className='top-banner-right-mobile'>
              <div className='row'>
                <div className='col-md-12 p-0'>
                  <img width='100%' src='/static/img/new/line-horizontal.jpg' />
                  <img
                    className='background-banner-image-mobile'
                    src='/static/img/new/banner-right-mobile.jpg'
                  />
                  <img
                    className='background-mobile-image-mobile'
                    src='/static/img/new/mobile-frame.png'
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      );
    }
  }

  render() {
    const isHomePage = this.props.data.home_page;
    const isConfirmationPage = this.props.data.confirmation_page;
    const darkMode = getCookieFromBrowser('dark_mode') === 'true';
    const { data, user, className, children: content } = this.props;
    const title = data.title
      ? `Clouty | ${data.title}`
      : `The 🌎's first music betting platform`;
    const cls = className ? `${className}` : '';
    const description = data.description
      ? data.description
      : 'Fantasy gameplay at the intersection of data, music and finance.';

    return (
      <div className={isConfirmationPage ? 'confirm-page' : ''}>
        <Head>
          <title>{title}</title>
          <meta name='description' content={description} />
          <meta property='og:title' content={title} />
          <meta property='og:description' content={description} />
          <meta
            name='twitter:title'
            content={`The 🌎's first music betting platform.`}
          />
          <meta name='twitter:description' content={description} />
        </Head>
        <div className={isHomePage ? 'pos-rel' : ''}>
          <Navigation user={user} darkMode={darkMode} router={Router} />
          {/* {this.renderHeader()} */}
          {this.renderHomePageHeader()}
        </div>
        <div className='center flex'>
          <main className={` w-100 ${cls}`}>{content}</main>
        </div>
        <Footer darkMode={darkMode} />
      </div>
    );
  }
}

Wrapper.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object,
  user: PropTypes.object,
  children: PropTypes.node,
};
