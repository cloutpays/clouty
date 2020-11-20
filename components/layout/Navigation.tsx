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
    <div>
      <section className='top-banner'>
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
          <a className='navbar-brand' href='/'>
            Clouty
          </a>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon' />
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item'>
                <a className='nav-link' href='/about'>
                  About <span className='sr-only'>(current)</span>
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='/games'>
                  Games
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='/terms'>
                  Terms
                </a>
              </li>
            </ul>
            <ul className='navbar-nav my-2 my-lg-0'>
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
                    <Link href='#' as='logout'>
                      <a onClick={handleLogout} className={navLinks}>
                        Logout
                      </a>
                    </Link>
                  </li>
                </>
              )}
              {!isLoggedIn && (
                <>
                  {/* <a href='/signup' className={`${styles.navigationLink}`}>
              <li className='mr2 mr4-ns'>Sign up </li>
            </a> */}
                  <li className='nav-item'>
                    <Link href='/login'>
                      <a href='/login' className='nav-link'>
                        Login
                      </a>
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <a
                      className='nav-link btn btn-sm btn-dark py-1 px-4 text-white mt-2'
                      href='/signup'>
                      Sign Up
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </section>
    </div>
  );
};

export default Navigation;
