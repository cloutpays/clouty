import { format } from 'date-fns';
import React from 'react';
import ReactGA from 'react-ga';
import Router from 'next/router';

export function getCurrentYear() {
  return new Date().getFullYear();
}

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
