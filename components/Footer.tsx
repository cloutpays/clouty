import classNames from 'classnames';
import React from 'react';
import { styles } from '../constants/styles';
import { setCookie } from '../lib/session';

import { getCurrentYear } from '../lib/helpers';
interface DarkModeProps {
  darkMode: boolean;
}
const Footer: React.FC<DarkModeProps> = ({ darkMode }) => {
  const setDarkMode = () => {
    setCookie('dark_mode', !darkMode);
    window.location.href = '/';
  };
  const navLinks = ` ${styles.navigationLink} ${classNames({
    'near-black': !darkMode,
    'near-white': darkMode,
  })}`;
  return (
    <footer className={'mw8 center mv4 mh2 f6 f5-ns fw7'}>
      <ul className='list pl0 flex mv0'>
        <li className='mr2 mr4-ns'>
          <a href='/about' className={`${navLinks}`}>
            About
          </a>
        </li>
        <li className='mr2 mr4-ns'>
          <a href='https://clouty.substack.com/' className={`${navLinks}`}>
            Newsletter
          </a>
        </li>
        <li className='mr2 mr4-ns'>
          <a href='/faq' className={`${navLinks}`}>
            FAQ
          </a>
        </li>
        <li className='mr2 mr4-ns'>
          <a href='/terms' className={`${navLinks}`}>
            Terms
          </a>
        </li>
        <li className={`${navLinks}`} onClick={setDarkMode}>
          {' '}
          {darkMode ? 'Light ' : 'Dark '} Mode
        </li>
      </ul>
      <p>© {getCurrentYear()} · Packaged with care.</p>
    </footer>
  );
};

export default Footer;
