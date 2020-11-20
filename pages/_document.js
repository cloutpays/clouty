import { getCookie, getCookieFromBrowser } from '../lib/session';
import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';
import classNames from 'classnames';
let dark = false;
export default class MyDocument extends Document {
  static getInitialProps(ctx) {
    const { renderPage, req } = ctx;
    const { html, head, errorHtml, chunks } = renderPage();
    dark = req
      ? getCookie('dark_mode', req) === 'true'
      : getCookieFromBrowser('dark_mode') === 'true';
    return {
      html,
      head,
      errorHtml,
      chunks,
    };
  }

  render() {
    return (
      <html lang='en'>
        <Head>
          <link
            rel='stylesheet'
            href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'
            integrity='sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm'
            crossOrigin='anonymous'
          />
          <link rel='stylesheet' href='/static/styles.min.css' />
          <link rel='stylesheet' href='/static/custom.css' />

          <link
            rel='icon'
            href='https://getclouty.com/static/img/transparent_clouty-umbrella.png'
          />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
          <meta charSet='utf-8' />
          <meta
            name='keywords'
            content='fantasy music, clouty, fantasy rap, music league'></meta>
          <meta name='description' content='Clouty™: Rap, Reimagined' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel='home' href='https://getclouty.com/' />
          <meta property='og:type' content='website' />
          <meta
            property='og:image'
            content='https://getclouty.com/static/img/clouty-04.png'
          />
          <meta property='og:url' content='http://getclouty.com/' />
          <meta property='og:site_name' content='Clouty' />
          <meta
            property='og:description'
            content='Fantasy gameplay at the intersection of data, music and finance.'
          />
          <meta name='twitter:card' content='summary' />
          <meta
            name='twitter:image'
            content='https://getclouty.com/static/img/clouty-04.png'
          />
          <meta name='twitter:site' content='@getclouty' />
          <meta name='twitter:title' content='Clouty' />
          <meta
            name='twitter:description'
            content='Fantasy gameplay at the intersection of data, music and finance.'
          />
          <meta name='twitter:creator' content='@getclouty' />
          <meta property='fb:app_id' content='1334983689990834' />
          <meta name='apple-mobile-web-app-title' content='Clouty' />
          <meta name='application-name' content='Clouty' />
          <meta name='theme-color' content='#ffffff' />

          <meta name='apple-mobile-web-app-title' content='Clouty' />
          <meta name='application-name' content='Clouty' />
        </Head>
        <body
          className={classNames({
            'sans-serif': true,
            'near-white': dark,
            'near-black': !dark,
            'bg-black-90': dark,
            'bg-white-90': !dark,
            f5: true,
            'f4-ns': true,
          })}>
          <Main />

          <NextScript />

          <script
            src='https://code.jquery.com/jquery-3.2.1.slim.min.js'
            integrity='sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN'
            crossOrigin='anonymous'></script>
          <script
            src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js'
            integrity='sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q'
            crossOrigin='anonymous'></script>
          <script
            src='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js'
            integrity='sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl'
            crossOrigin='anonymous'></script>
        </body>
      </html>
    );
  }
}
