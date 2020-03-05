import axios from 'axios';
// import Router from 'next/router';
import 'cleave.js/dist/addons/cleave-phone.us';
import Cleave from 'cleave.js/react';

import React, { useState } from 'react';
interface PayoutFormProps {
  user: any;
}

const PayoutForm: React.FC<PayoutFormProps> = ({ user }) => {
  const [email, setEmail] = useState<string>(
    user
      ? user.info.payout
        ? user.info.payout.email
        : user.firebase.email
      : '',
  );
  const [preferred, setPreferred] = useState<string>(
    user ? (user.info.payout ? user.info.payout.preferred : '') : '',
  );
  const [handle, setHandle] = useState<string>(
    user ? (user.info.payout ? user.info.payout.handle : '') : '',
  );
  const [amount, setAmount] = useState<string>('0');
  const [appleID, setAppleID] = useState<string>('');
  const [payoutError, setPayoutError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    if (!loading) {
      setLoading(true);
      const date = new Date();
      const userSubmission = {
        user: {
          ...user,
          info: {
            ...user.info,
            payout: {
              email,
              handle,
              appleID,
              preferred,
              lastUpdated: date,
            },
          },
        },
        payoutRequest: {
          userId: user._id,
          preferred,
          appleID,
          handle,
          email,
          amount: amount.substring(2),
          previousBalance: user.stripe.user.balance,
          newBalance:
            user.stripe.user.balance -
            parseInt(amount.substring(2), undefined) * 100,
          date,
        },
      };
      await axios({
        method: 'post',
        url: '/api/payout',
        data: { data: userSubmission },
      });
      setLoading(false);
    }
  };
  return (
    <div className='row'>
      <div className='form-card'>
        <form onSubmit={handleSubmit} className='measure center'>
          <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
            <div className='mt3'>
              <div className='flex items-center mb2'>
                <input
                  onClick={() => setPreferred('cashapp')}
                  type='radio'
                  name='payout'
                  value='cashapp'
                  checked={preferred === 'cashapp'}
                />
                <label htmlFor='cashapp' className='db fw6 lh-copy f6'>
                  Cashapp
                </label>
              </div>
              <div className='flex items-center mb2'>
                <input
                  checked={preferred === 'paypal'}
                  type='radio'
                  name='payout'
                  onClick={() => setPreferred('paypal')}
                  value='paypal'
                />
                <label htmlFor='spacejam' className='db fw6 lh-copy f6'>
                  Paypal
                </label>
              </div>
              <div className='flex items-center mb2'>
                <input
                  checked={preferred === 'applepay'}
                  type='radio'
                  name='payout'
                  onClick={() => setPreferred('applepay')}
                  value='applepay'
                />
                <label htmlFor='spacejam' className='db fw6 lh-copy f6'>
                  Apple Pay
                </label>
              </div>
            </div>
            <div className='mt3' />
            {preferred === 'paypal' && (
              <div className='mt3'>
                <label className='db fw6 lh-copy f6' htmlFor='email-address'>
                  Paypal Email
                </label>
                <input
                  type='email'
                  className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  value={email}
                  onChange={(event) => setEmail(event.currentTarget.value)}
                  name='email'
                  required={true}
                />
              </div>
            )}{' '}
            {preferred === 'cashapp' && (
              <div className='mt3'>
                <label className='db fw6 lh-copy f6' htmlFor='cash-app'>
                  Cash App Handle
                </label>
                <input
                  className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  value={handle}
                  onChange={(event) => setHandle(event.currentTarget.value)}
                  name='name'
                  required={true}
                />
              </div>
            )}
            {preferred === 'applepay' && (
              <div className='mt3'>
                <label className='db fw6 lh-copy f6' htmlFor='phone-number'>
                  Phone Number or Apple ID
                </label>
                <input
                  className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  value={appleID}
                  onChange={(event) => setAppleID(event.currentTarget.value)}
                  name='phone-number'
                  required={true}
                />
              </div>
            )}
            <div className='mt3'>
              <label className='db fw6 lh-copy f6' htmlFor='cash-app'>
                Payout Amount
              </label>
              <Cleave
                className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                placeholder='$ '
                value={amount}
                onChange={(event) => {
                  setAmount(event.currentTarget.value);
                  setPayoutError(
                    parseInt(
                      event.currentTarget.value
                        .substring(2)
                        .split(',')
                        .join(''),
                      undefined,
                    ) *
                      100 >
                      user.stripe.user.balance,
                  );
                }}
                options={{ prefix: '$ ', numeral: true }}
              />
              <small id='name-desc' className='hljs-strong f6 red db mv2'>
                {payoutError &&
                  'Insuffient funds. Please enter a smaller amount'}
              </small>
            </div>
          </fieldset>
          {!payoutError &&
            parseInt(
              amount
                .substring(2)
                .split(',')
                .join(''),
              undefined,
            ) > 0 && (
              <div>
                <input
                  className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
                  type='submit'
                  value='Submit'
                  onClick={handleSubmit}
                />
              </div>
            )}
        </form>
      </div>
    </div>
  );
};

export default PayoutForm;
