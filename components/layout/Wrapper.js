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

  render() {
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
      <div>
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
        <Navigation user={user} darkMode={darkMode} router={Router} />
        {/* {this.renderHeader()} */}
        <div className='center flex'>
          <main className={`mb5 w-100 ${cls}`}>{content}</main>
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
