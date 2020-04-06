import classNames from 'classnames';
import Link from 'next/link';
import { SingletonRouter } from 'next/router';
import React from 'react';
import { styles } from '../../constants/styles';
import { getCookieFromBrowser, removeCookie } from '../../lib/session';

interface Navigation {
  user: any;
  darkMode: boolean;
  router: SingletonRouter;
}

const Navigation: React.FC<Navigation> = ({ darkMode, router }) => {
  const handleLogout = () => {
    removeCookie('id_token');
    removeCookie('id_token_a');
    router.push('/');
  };
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
          <li className='mr2 mr4-ns '>
            <Link href='/dashboard'>
              <a
                href='/dashboard'
                className={`${navLinks} pb2 underline-hover `}>
                Admin
              </a>
            </Link>
          </li>
        )}
        <li className='mr2 mr4-ns'>
          <Link href='/about'>
            <a href='/about' className={`${navLinks} pb2 underline-hover `}>
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
          <>
            <li className='mr2 mr4-ns underline-hover'>
              <Link href='/user'>
                <a href='/user' className={navLinks}>
                  Profile
                </a>
              </Link>
            </li>
            <li className='mr2 mr4-ns underline-hover'>
              <a onClick={handleLogout} className={navLinks}>
                Logout
              </a>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <>
            {/* <a href='/signup' className={`${styles.navigationLink}`}>
              <li className='mr2 mr4-ns'>Sign up </li>
            </a> */}
            <li className='mr2 mr4-ns underline-hover'>
              <Link href='/login'>
                <a href='/login' className={`${navLinks}`}>
                  Login
                </a>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
