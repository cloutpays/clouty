import { darkMode } from '../lib/helpers';
import classNames from 'classnames';
console.log(darkMode);
export const styles = {
  wrapper: `mw8 center`,
  link: 'gray fw7 link no-underline b bb bw1 dim',
  linkNormalWeight: 'near-black link no-underline bb bw1 b--orange dim',
  navigationLink: `fw7 link no-underline `,
  unorderedList: 'list unordered-list lh-copy',
  paragraph: `lh-copy tc ${classNames({
    gray: !darkMode,
    'white-70': darkMode,
  })} ph4`,
  h1: 'f3 f2-ns',
  h2: `f3 fw8 f2-ns mv0 tc db mb0 `,
  h3: 'f5 f4-ns mt3 mt4-ns mb0',
  blockquote: 'quote b--black-30 lh-copy pl3 bl f4 o-60 mt4 mb4',
};
