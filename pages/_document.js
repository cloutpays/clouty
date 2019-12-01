import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage();
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
            rel='icon'
            type='image/x-icon'
            href='https://getclouty.com/static/img/clouty-04.png'
          />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
          <meta charset='utf-8' />
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
          <meta property='og:title' content='Clouty™: Rap, Reimagined' />
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
            content='Bridging the gap between DC culture, music and tech thru events, experiences and service.'
          />
          <meta name='twitter:creator' content='@getclouty' />
          <meta property='fb:app_id' content='1334983689990834' />
          <meta name='apple-mobile-web-app-title' content='Clouty' />
          <meta name='application-name' content='Clouty' />
          <meta name='theme-color' content='#ffffff' />

          <meta name='apple-mobile-web-app-title' content='Clouty' />
          <meta name='application-name' content='Clouty' />
        </Head>
        <body>
          <Main />

          <NextScript />
        </body>
      </html>
    );
  }
}
