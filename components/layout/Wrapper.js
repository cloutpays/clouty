import { getCookieFromBrowser } from '../../lib/session';
import { initGA, instance, logPageView } from '../../lib/helpers';
// import { styles } from '../../constants/styles';
import Footer from './Footer';
import Head from 'next/head';
import Navigation from './Navigation';
import PageWrapper from '../redesign/PageWrapper';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Router from 'next/router';

// Should redesign wrapper be used (displays old pages embedded in the new layout)
const ENABLE_REDESIGN_WRAPPER = true;

/*
// Removed because the new PageWrapper integrates this

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};
*/

const Wrapper = (props) => {
  const [emailAddress, setEmailAddress] = useState('');
  const [submit, setSubmit] = useState(false);

  const sendEmail = async (email) => {
    setSubmit(true);
    instance.post(`/api/waitlist?email=${email}`);
  };

  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }, []);

  // const renderHeader = () => {
  //   if (props.data.header) {
  //     return (
  //       <header className={`${styles.wrapper}`}>
  //         <div className='mt5 mb4'>
  //           <h2 className={`${styles.h2}`}>{props.data.header}</h2>
  //         </div>
  //       </header>
  //     );
  //   }
  //   return null;
  // };

  const renderHomePageHeader = () => {
    if (props.data.home_page) {
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
                  The 🌎&apos;s first music <br></br> futures exchange.
                </h1>
                <div>
                  <span>
                    We created a music prediction market by turning realtime
                    music metrics into tradeable indexes. Join the waitlist to
                    be admitted into our growing list of beta users.
                  </span>
                </div>
                <div className='flex my-4 py-4'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter Email Address'
                    value={emailAddress}
                    onChange={(event) => {
                      setSubmit(false);
                      setEmailAddress(event.target.value);
                    }}
                  />
                  <button
                    onClick={() => sendEmail(emailAddress)}
                    className='text-white  '>
                    {` ${submit ? 'Thanks!' : 'Submit'} `}
                  </button>
                </div>
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
  };

  const shouldUseRedesign = () => {
    if (!ENABLE_REDESIGN_WRAPPER) return false;
    if (props.data.home_page) return false;
    if (props.data.ignoreWrapper) return false;
    return true;
  };

  const isHomePage = props.data.home_page;
  const isConfirmationPage = props.data.confirmation_page;
  const darkMode = getCookieFromBrowser('dark_mode') === 'true';
  const { data, user, className, children: content } = props;
  const title = data.title
    ? `Clouty | ${data.title}`
    : `The 🌎's first music futures exchange`;
  const cls = className ? `${className}` : '';
  const description = data.description
    ? data.description
    : 'Fantasy gameplay at the intersection of data, music and finance.';

  if (shouldUseRedesign())
    return (
      <div style={{ backgroundColor: '#1b1a1a', height: '100%' }}>
        <Head>
          <title>{title}</title>
          <meta name='description' content={description} />
          <meta property='og:title' content={title} />
          <meta property='og:description' content={description} />
          <meta
            name='twitter:title'
            content={`The 🌎's first music futures exchange.`}
          />
          <meta name='twitter:description' content={description} />
        </Head>
        <PageWrapper pageMode='legacy' header={title.replace(/Clouty \|/, '')}>
          {content}
        </PageWrapper>
      </div>
    );

  return (
    <div className={isConfirmationPage ? 'confirm-page' : ''}>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta
          name='twitter:title'
          content={`The 🌎's first music futures exchange.`}
        />
        <meta name='twitter:description' content={description} />
      </Head>
      <div className={isHomePage ? '' : ''}>
        <Navigation user={user} darkMode={darkMode} router={Router} />
        {/* {renderHeader()} */}
        {renderHomePageHeader()}
      </div>
      <div className='center flex'>
        <main className={` w-100 ${cls}`}>{content}</main>
      </div>
      <Footer darkMode={darkMode} />
    </div>
  );
};

Wrapper.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object,
  user: PropTypes.object,
  children: PropTypes.node,
};

export default Wrapper;
