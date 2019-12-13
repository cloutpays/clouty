import React from 'react';

import { getCurrentYear } from '../lib/date';
// import { styles } from '../constants/styles';

const Footer = () => (
  <footer className='mw8 center mv4 mh2 f6 f5-ns near-black fw7'>
    <p>© {getCurrentYear()} · Packaged with care.</p>
  </footer>
);

export default Footer;
