import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import { styles } from '../../constants/styles';
import { getCookieFromBrowser } from '../../lib/session';

interface DarkModeProps {
  darkMode: boolean;
}

const Navigation: React.FC<DarkModeProps> = ({ darkMode }) => {
  const isLoggedIn = getCookieFromBrowser('id_token') ? true : false;
  const isAdmin = getCookieFromBrowser('id_token_a') ? true : false;
  const navLinks = ` ${styles.navigationLink} ${classNames({
    'near-black': !darkMode,
    'near-white': darkMode,
  })}`;
  return (
    <nav className=' center flex items-center mb5 ma3 ma4-l'>
      <Link href='/'>
        <a href='/' className='white pl2 flex-grow-1 no-underline '>
          <img
            width='40px'
            height='40px'
            src='/static/img/transparent_clouty-umbrella.png'
          />
        </a>
      </Link>
      <ul className='list pl0 flex mv0'>
        {/* {isLoggedIn && (
          <li className='mr2 mr4-ns'>
            <Link href='/dashboard'>
              <a className={`${styles.navigationLink}`}>Admin</a>
            </Link>
          </li>
        )} */}
        {isLoggedIn && isAdmin && (
          <li className='mr2 mr4-ns underline-hover'>
            <Link href='/dashboard'>
              <a href='/dashboard' className={`${navLinks}`}>
                Admin
              </a>
            </Link>
          </li>
        )}
        <li className='mr2 mr4-ns underline-hover'>
          <Link href='/about'>
            <a href='/about' className={`${navLinks}`}>
              About
            </a>
          </Link>
        </li>
        <li className='mr2 mr4-ns underline-hover'>
          <Link href='/games'>
            <a href='/games' className={`${navLinks}`}>
              Games
            </a>
          </Link>
        </li>
        {isLoggedIn && (
          <li className='mr2 mr4-ns underline-hover'>
            <Link href='/user'>
              <a href='/user' className={`${navLinks}`}>
                Profile
              </a>
            </Link>
          </li>
        )}
        {!isLoggedIn && (
          <>
            {/* <a href='/signup' className={`${styles.navigationLink}`}>
              <li className='mr2 mr4-ns'>Sign up </li>
            </a> */}
            <a href='/login' className={`${navLinks} underline-hover`}>
              <li className='mr2 mr4-ns'>Login</li>
            </a>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
