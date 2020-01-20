import React from 'react';
import { styles } from '../constants/styles';

import { getCurrentYear } from '../lib/helpers';

const Footer = () => (
  <footer className='mw8 center mv4 mh2 f6 f5-ns near-black fw7'>
    <ul className='list pl0 flex mv0'>
      <li className='mr2 mr4-ns'>
        <a
          href='https://clouty.substack.com/subscribe'
          className={`${styles.navigationLink}`}>
          Newsletter
        </a>
      </li>
      <li className='mr2 mr4-ns'>
        <a href='/terms' className={`${styles.navigationLink}`}>
          Terms
        </a>
      </li>
    </ul>
    <p>© {getCurrentYear()} · Packaged with care.</p>
  </footer>
);

export default Footer;
