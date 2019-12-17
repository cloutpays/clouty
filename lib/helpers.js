import { format } from 'date-fns';
import ReactGA from 'react-ga';

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
