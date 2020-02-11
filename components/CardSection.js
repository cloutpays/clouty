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
      <button onClick={goToCheckout}>Continue</button>
    </main>
  );
};
Checkout.propTypes = {
  sessionId: PropTypes.any,
  user: PropTypes.object,
};

export default Checkout;
