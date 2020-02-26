import Router from 'next/router';
import React from 'react';
import { formatPrice } from '../lib/helpers';
import { removeCookie } from '../lib/session';

const Navigation = (props: any) => {
  const { user } = props;
  const handleLogout = () => {
    removeCookie('id_token');
    Router.push('/');
  };
  return (
    <>
      <nav className='w-100 w-25-m w-25-l mb4 mb0-l ph3-m ph3-l'>
        <h2 className='ttu mt0 mb2 f6 fw5 silver'>Manage</h2>
        <ul className='list pl0 mt0 mb4'>
          <li className='mb2'>
            <a href='/user/info' className='block link dim blue'>
              Account Information
            </a>
          </li>
          <li className='mb2'>
            <a href='#' className='block link dim blue'>
              Payouts
            </a>
          </li>
          <li className='mb2'>
            <a href='#' className='block link dim blue'>
              Game History
            </a>
          </li>
        </ul>
        <h2 className='ttu mt0 mb2 f6 fw5 silver'>More</h2>
        <ul className='list pl0 mt0 mb2'>
          <li className='mb2'>
            <a href='#' className='block link dim blue'>
              Help
            </a>
          </li>
          <li className='mb2'>
            <a href='#' className='block link dim blue'>
              Refer a Friend
            </a>
          </li>
          <li className='mb2'>
            <a onClick={handleLogout} className='block link dim blue'>
              Logout
            </a>
          </li>
        </ul>
      </nav>
      <article className='w-100 w-75-m w-75-l ph3-m ph3-l'>
        <header className='mb3'>
          <h2 className='ttu mt0 mb1 f6 fw5 silver'>Balance</h2>
          <h1 className='fw3 dark-gray mt0 mb0'>
            {formatPrice(user.stripe.user.balance / 100)}
          </h1>
          <a
            href='/user/balance'
            className=' f6 no-underline fw5 mt3 br2 ph3 pv2 dib ba b--blue blue bg-white hover-bg-blue hover-white'>
            Add to Balance
          </a>
        </header>
        <hr className='o-20' />
      </article>
    </>
  );
};

export default Navigation;
