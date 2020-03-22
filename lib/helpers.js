import { format } from 'date-fns';
import { getCookieFromBrowser } from './session';
import React from 'react';
import ReactGA from 'react-ga';
import Router from 'next/router';
export const dev = true;
export const stripeClient = dev
  ? process.env.STRIPE_CLIENT_DEV
  : process.env.STRIPE_CLIENT_PROD;

export function getCurrentYear() {
  return new Date().getFullYear();
}

export const darkMode =
  getCookieFromBrowser('dark_mode') === 'true' ? true : false;

export const colorways = [
  'collective-gallery',
  'mark-gierl',
  'kanye-wtf',
  'trillectro ',
  'apprentice-at',
  'komputer-maschine',
  'hoist ',
  'mycumortgage ',
  'style-guide',
  'contact-card',
  'grammy',
];
// Format price
export function formatPrice(number) {
  const fnumber = parseFloat(number);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(fnumber);
}

export const sortGames = (a, b) => {
  const aname = a.answer.length === 0;
  const bname = b.answer.length === 0;
  if ((aname && !bname) || parseInt(a.question) > parseInt(b.question)) {
    return 1;
  }
  if (!aname && bname) {
    return -1;
  }
  return 0;
};
export const formatDate = (date) => format(date, 'MMMM d, yyyy');

export const initGA = () => {
  ReactGA.initialize('UA-154554102-1');
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};

export const logEvent = (category = '', action = '') => {
  if (category && action) {
    ReactGA.event({ category, action });
  }
};

export const logException = (description = '', fatal = false) => {
  if (description) {
    ReactGA.exception({ description, fatal });
  }
};

export const redirect = (context = {}, target) => {
  console.log(context, target);
  if (context.res) {
    context.res.writeHead(303, { Location: target });
    context.res.end();
  } else {
    Router.replace(target);
  }
};
export const grammyRender = (game) => {
  const newArtist = game.slug === 'best-new-artist';
  return game.description.split('/').map((curr, i) => {
    return (
      <div key={i} className='mv2'>
        {!newArtist ? `${curr.split(',')[0]} - ` : ``}
        {!newArtist ? (
          <strong>{curr.split(',')[1]}</strong>
        ) : (
          <strong>{curr.split(',')[0]}</strong>
        )}
      </div>
    );
  });
};
