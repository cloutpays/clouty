import axios from 'axios';
import Link from 'next/link';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { formatPrice } from '../lib/helpers';
import { removeCookie } from '../lib/session';

interface NavigationProps {
  balance: number;
  user: any;
}

const Navigation: React.FC<NavigationProps> = ({ balance, user }) => {
  const [userBalance, setUserBalance] = useState(balance);
  const handleLogout = () => {
    removeCookie('id_token');
    Router.push('/');
  };
  useEffect(() => {
    const getBalance = async () => {
      const currentUser = await axios.get(`/api/user/${user._id}`);
      const updateBalance = currentUser?.data?.stripe?.user?.balance ?? 0;
      setUserBalance(updateBalance);
    };
    getBalance();
  }, [balance]);
  return (
    <>
      <nav className='w-100 mb0-l ph3-m ph3-l flex center'>
        <div className='mr5'>
          <h2 className='ttu mt0 mb2 f6 fw5 silver'>Manage</h2>
          <ul className='list pl0 mt0 mb4'>
            <li className='mb2'>
              <a href='/user/info' className='block link dim blue'>
                Account Information
              </a>
            </li>
            <li className='mb2'>
              <a href='/user/payouts' className='block link dim blue'>
                Payouts
              </a>
            </li>
            <li className='mb2'>
              <a href='#' className='block link dim blue'>
                Game History
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className='ttu mt0 mb2 f6 fw5 silver'>More</h2>
          <ul className='list pl0 mt0 mb2'>
            <li className='mb2'>
              <a href='mailto:umeh@clouty.io' className='block link dim blue'>
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
        </div>
      </nav>
      <article className='w-100 w-75-m w-75-l ph3-m ph3-l'>
        <header className='mb3'>
          <h2 className='ttu mt0 mb1 f6 fw5 silver'>Balance</h2>
          <h1 className='fw3 dark-gray mt0 mb0'>
            {formatPrice(userBalance / 100)}
          </h1>
          <Link href='/user/balance'>
            <a className=' f6 no-underline fw5 mt3 br2 ph3 pv2 dib ba b--blue blue bg-white hover-bg-blue hover-white'>
              Add to Balance
            </a>
          </Link>
        </header>
        <hr className='o-20' />
      </article>
    </>
  );
};

export default Navigation;
