import { format } from 'date-fns';

export function getCurrentYear() {
  return new Date().getFullYear();
}

export function formatDate(date) {
  return format(date, 'MMMM D, YYYY');
}
