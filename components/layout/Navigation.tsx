import Link from 'next/link';
import { SingletonRouter } from 'next/router';
import React, { useEffect } from 'react';
import { getCookieFromBrowser, removeCookie } from '../../lib/session';

interface NavProps {
  user: any;
  darkMode: boolean;
  router: SingletonRouter;
}

const Navigation: React.FC<NavProps> = ({ router }) => {
  useEffect(() => {
    if (router.router && router.router.route === '/' && isLoggedIn) {
      router.push('/home');
    }
  }, [router]);

  const handleLogout = () => {
    removeCookie('id_token');
    removeCookie('id_token_a');
    router.push('/');
  };
  const isLoggedIn = getCookieFromBrowser('id_token') ? true : false;
  const isAdmin = getCookieFromBrowser('id_token_a') ? true : false;

  return (
    <section className='top-banner'>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <a className='navbar-brand' href='/'>
          <img className='logo-mobile' src='/static/img/new/logo-mobile.svg' />
          <img className='logo-web' src='/static/img/new/logo-web.svg' />
        </a>
        <button
          className='navbar-toggler homepage-nav-toggler'
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
            <li className='nav-item links mobile-nav-item-home '>
              <a className='nav-link' href='/'>
                Home
              </a>
            </li>
            {isLoggedIn && isAdmin && (
              <li className='nav-item links mobile-nav-item-home '>
                <Link href='/dashboard'>
                  <a href='/dashboard' className='nav-link'>
                    Admin
                  </a>
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li className='nav-item links mobile-nav-item-home '>
                <Link href='/user'>
                  <a href='/user' className='nav-link'>
                    Profile
                  </a>
                </Link>
              </li>
            )}
            <li className='nav-item links mobile-nav-item-home '>
              <a className='nav-link' href='/about'>
                About
              </a>
            </li>
            <li className='nav-item links mobile-nav-item-home '>
              <a className='nav-link' href='/games'>
                Games
              </a>
            </li>
            {isLoggedIn && (
              <li className='nav-item links mobile-nav-item-home '>
                <Link href='#' as='logout'>
                  <a onClick={handleLogout} className='nav-link'>
                    Logout
                  </a>
                </Link>
              </li>
            )}
          </ul>
          <ul className='navbar-nav my-2 my-lg-0'>
            {!isLoggedIn && (
              <>
                <li className='nav-item' id='nav-login'>
                  <a href='/login' className='nav-link login-btn'>
                    Log In
                  </a>
                </li>
                {/* <li className='nav-item' id='nav-signup'>
                  <a
                    className='nav-link btn btn-sm btn-dark text-white mt-2'
                    href='/signup'>
                    Sign Up
                  </a>
                </li> */}
                <li className='nav-item' id='mobile-nav-login'>
                  <a href='/login' className='nav-link login-btn'>
                    Log In
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </section>
  );
};

export default Navigation;
