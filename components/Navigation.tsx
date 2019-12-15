import Link from 'next/link';
import React from 'react';

import { styles } from '../constants/styles';

const Navigation = () => (
  <nav className='mw8 center flex items-center mb5'>
    <Link href='/'>
      <a href='/' className='white flex-grow-1 no-underline'>
        <svg width='40px' height='40px' viewBox='0 0 500 500'>
          <title>Clouty</title>
          <defs>
            <linearGradient
              x1='0%'
              y1='42.4558081%'
              x2='100%'
              y2='42.4558073%'
              id='linearGradient'>
              <stop stopColor='#5B3C70' offset='0%' />
              <stop stopColor='#E57B5D' offset='100%' />
            </linearGradient>
          </defs>
          <polygon
            id='Fill-1'
            fill='url(#linearGradient)'
            points='0 499.321464 499.321464 499.321464 499.321464 0 0 0'
          />
        </svg>
      </a>
    </Link>
    <ul className='list pl0 flex mv0'>
      <li className='mr2 mr4-ns'>
        <Link href='/games'>
          <a href='/games' className={`${styles.navigationLink}`}>
            Games
          </a>
        </Link>
      </li>
      <li className='mr2 mr4-ns'>
        <Link href='/about'>
          <a href='/about' className={`${styles.navigationLink}`}>
            About
          </a>
        </Link>
      </li>
      <li>
        <Link href='/contact'>
          <a href='/contact' className={`${styles.navigationLink}`}>
            Contact
          </a>
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
