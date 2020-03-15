import Head from 'next/head';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Footer from './Footer';
import Navigation from './Navigation';

import { initGA, logPageView } from '../lib/helpers';
import { styles } from '../constants/styles';

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
            <h2 className='f3 fw8 f2-ns mv0 tc db near-black mb0'>
              {this.props.data.header}
            </h2>
          </div>
        </header>
      );
    }
    return null;
  }

  render() {
    const { data, user, className, children: content } = this.props;

    const title = data.title
      ? `Clouty | ${data.title}`
      : `The 🌎's first music betting platform`;
    const cls = className ? `${className}` : '';
    const description = data.description
      ? data.description
      : 'Fantasy gameplay at the intersection of data, music and finance.';

    return (
      <div className='ma3 ma4-l'>
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
        <Navigation user={user} />
        {this.renderHeader()}
        <div className='mw8 center flex'>
          <main className={`mb5 w-100 ${cls}`}>{content}</main>
        </div>
        <Footer />
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
