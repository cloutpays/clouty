import { format } from 'date-fns';

export function getCurrentYear() {
  return new Date().getFullYear();
}

export const formatDate = (date) => format(date, 'MMMM D, YYYY');
