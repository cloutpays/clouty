import { stripeClient } from '../../lib/helpers';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Checkout = ({user}) => {
  const [amount, setAmount] = useState(0);

  return (
    <main className='black-80'>
      <dl className='dib '>
        <div className='flex f3 f2-ns flex-wrap'>
          <a
            onClick={() => setAmount(1)}
            className='noselect grow outline dim pa3 ma2'>
            <strong>$1</strong>
          </a>
          <a
            onClick={() => setAmount(10)}
            className='noselect grow outline dim pa3 ma2'>
            <strong>$10</strong>
          </a>
          <a
            onClick={() => setAmount(25)}
            className='noselect grow outline dim pa3 ma2'>
            <strong>$25</strong>
          </a>
          <a
            onClick={() => setAmount(50)}
            className='noselect grow outline dim pa3 ma2'>
            <strong>$50</strong>
          </a>
          <a
            onClick={() => setAmount(75)}
            className='noselect grow outline dim pa3 ma2'>
            <strong>$75</strong>
          </a>
          <a
            onClick={() => setAmount(100)}
            className='noselect grow outline dim pa3 ma2'>
            <strong>$100</strong>
          </a>
        </div>
      </dl>
      <div className='near-black pt3 fw7 pb3'>
        <dl className='dib mr5'>
          <dd className='f6 f5-ns b ml0'>Total</dd>
          <dd className='f3 f2-ns b ml0'>${amount}</dd>
        </dl>
      </div>
      {amount> 0 && (
        <div
          className='f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box'>
          <form action="https://api.connexus.fi/apiv1/bridge" method="post">
            <input type="hidden" name="amount" value={amount}/>
            <input type="hidden" name="customParm" value={user._id}/>
            <input type="hidden" name="pluginKey" value="fa835a8d-9ea4-4ea5-89e7-6811e5cf3a71"/>
            <input type="hidden" name="merchantTrackingNumber" value="test"/>
            <div class="cxs-btn">
              <button id="cxs-btn-default" type="submit">
                <span id="cxs-span">
                  <strong>PAY WITH</strong>
                </span>
              </button>
            </div>
          </form>
          <svg
            className='w1'
            data-icon='chevronRight'
            viewBox='0 0 32 32'
            style={{ fill: 'currentcolor' }}>
            <title>chevronRight icon</title>
            <path d='M12 1 L26 16 L12 31 L8 27 L18 16 L8 5 z'></path>
          </svg>
        </div>
      )}
    </main>
  );
};
Checkout.propTypes = {
  sessionId: PropTypes.any,
  user: PropTypes.object,
};

export default Checkout;
