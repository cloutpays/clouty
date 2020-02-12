import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Checkout = (props) => {
  const [stripe, setStripe] = useState(null);
  const [amount, setAmount] = useState(0);
  const [sessionId, setSessionId] = useState(0);

  useEffect(() => setStripe(window.Stripe(process.env.STRIPE_CLIENT_DEV)), []);

  const getSession = async (amount) => {
    const sessionId = await axios.get(
      `/api/checkout/${amount}/${props.user._id}`,
    );
    setSessionId(sessionId.data.id);
  };

  const updateAmount = async (amount) => {
    setAmount(amount);
    await getSession(amount);
  };
  const goToCheckout = () => {
    stripe
      .redirectToCheckout({
        sessionId,
      })
      .then(function(result) {
        console.log(result);
      });
  };

  return (
    <main className='black-80'>
      <div className='near-black fw7 pb3'>Select Amount</div>
      <div className='flex flex-wrap'>
        <a
          onClick={() => updateAmount(10)}
          className='noselect grow outline dim pa3 mr2'>
          <strong>$10</strong>
        </a>
        <a
          onClick={() => updateAmount(15)}
          className='noselect grow outline dim pa3 mr2'>
          <strong>$15</strong>
        </a>
        <a
          onClick={() => updateAmount(20)}
          className='noselect grow outline dim pa3 mr2'>
          <strong>$20</strong>
        </a>
        <a
          onClick={() => updateAmount(25)}
          className='noselect grow outline dim pa3 mr2'>
          <strong>$25</strong>
        </a>
      </div>
      <div className='near-black pt3 fw7 pb3'>Total: ${amount}</div>
      <div
        onClick={goToCheckout}
        className='f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box'>
        <span className='pr1'>Next</span>
        <svg
          className='w1'
          data-icon='chevronRight'
          viewBox='0 0 32 32'
          style='fill:currentcolor'>
          <title>chevronRight icon</title>
          <path d='M12 1 L26 16 L12 31 L8 27 L18 16 L8 5 z'></path>
        </svg>
      </div>
    </main>
  );
};
Checkout.propTypes = {
  sessionId: PropTypes.any,
  user: PropTypes.object,
};

export default Checkout;
