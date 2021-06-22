import { format } from 'date-fns';
import { getCookieFromBrowser } from './session';
import React from 'react';
import ReactGA from 'react-ga';
import Router from 'next/router';
import axios from 'axios';
export const dev =
  process.env.ENV === 'development' || process.env.NODE_ENV === 'development';
export const staging = process.env.ENV === 'staging';
export const getCurrentYear = new Date().getFullYear();
export const instance = axios.create({
  headers: { Authorization: 'Bearer ' + process.env.API_KEY },
});
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

export const formatPriceWithFractionDigits = (amount) => {
  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 3,
  };
  // if its a whole, dollar amount, leave off the .00
  if (amount % 100 === 0) options.minimumFractionDigits = 0;
  const formatter = new Intl.NumberFormat('en-US', options).format(
    amount / 100,
  );
  if (formatter.includes('.')) {
    return formatter.slice(0, -1);
  }
  return formatter;
};

export const convertAmericanToDecimalOdds = (odds) => {
  const floatingPointOdds = Math.abs(parseFloat(odds));
  const positive = odds[0] === '+';
  if (positive) {
    return (floatingPointOdds / 100 + 1).toPrecision(4);
  } else {
    return (100 / floatingPointOdds + 1).toPrecision(4);
  }
};

export const convertDollarsToCents = (amount) => amount * 100;

export const calculateTotalPayout = (odds = '+100', wager) => {
  const decimalOdds = convertAmericanToDecimalOdds(odds);
  const payOutTotal = wager * decimalOdds;
  return convertDollarsToCents(payOutTotal);
};

export const calculateTotalPayoutWithCredits = (odds = '+100', wager) => {
  const decimalOdds = convertAmericanToDecimalOdds(odds);
  const payOutTotal = wager * decimalOdds - wager;
  return convertDollarsToCents(payOutTotal);
};

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

export const formatConnexDate = (dateString) => {
  const date = dateString.split('%3A').join(':');
  return format(new Date(date), 'MM/d/yy h:mm a');
};

export const formatConnexEmail = (emailString) =>
  emailString.split('%40').join('@');

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
