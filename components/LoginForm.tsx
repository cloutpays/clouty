import axios from 'axios';
import 'cleave.js/dist/addons/cleave-phone.us';
import Cleave from 'cleave.js/react';
import 'emoji-mart/css/emoji-mart.css';
import Router from 'next/router';
import React, { useState } from 'react';
import Firebase from '../lib/firebase';
import { setCookie } from '../lib/session';

interface LoginFormProps {
  email: string;
  password: string;
  mode: string;
  firstName: string;
  lastName: string;
  redirect: string;
}
const LoginForm: React.FC<LoginFormProps> = ({ mode }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const [error, setError] = useState<string>('');
  const signUp = mode === 'signup';
  const handleSignUp = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();

    if (!(email && password)) {
      setError('Please fill in email. and password');
      return;
    }
    let isError = false;
    Firebase.signup({ email, password })
      .catch((result) => {
        const message =
          result && result.message ? result.message : 'Sorry Some error occurs';
        isError = true;
        setError(message);
      })
      .then((result: any) => {
        if (isError) {
          return;
        }
        if (typeof result !== 'undefined') {
          setCookie('id_token', result.user.uid);
          Router.push('/dashboard');
          axios
            .post('/api/user', {
              data: {
                firebase: result.user,
                email: result.user.email,
                info: { firstName, lastName, phoneNumber },
              },
            })
            .then(() => {});
        }
      });
  };
  const handleLogin = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();

    if (!(email && password)) {
      setError('Please fill in email. and password');
      return;
    }

    let isError = false;
    Firebase.login(Firebase.EMAIL, { email, password })
      .catch((result: any) => {
        const message =
          result && result.code.split('/')[1] === 'user-not-found'
            ? "Sorry, we couldn't find an account with that username. Please try again."
            : "Sorry, that passowrd isn't right. Please try again.";
        setError(message);

        isError = true;
      })
      .then((result: { message: any; user: { uid: string } }) => {
        if (isError) {
          return;
        }
        setCookie('id_token', result.user.uid);
        Router.push('/dashboard');
        axios
          .post('/api/user', { data: { firebase: result.user } })
          .then(() => {});
      });
  };

  return (
    <>
      <main className='black-80'>
        <form className='measure center'>
          <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
            {signUp ? (
              <>
                {' '}
                <div className='mt1'>
                  <label className='db fw6 lh-copy f6' htmlFor='first-name'>
                    First Name
                  </label>
                  <input
                    className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                    type='name'
                    value={firstName}
                    onChange={(event) =>
                      setFirstName(event.currentTarget.value)
                    }
                  />
                </div>
                <div className='mv3'>
                  <label className='db fw6 lh-copy f6' htmlFor='last-name'>
                    Last Name
                  </label>
                  <input
                    className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                    type='name'
                    value={lastName}
                    onChange={(event) => setLastName(event.currentTarget.value)}
                  />
                </div>
                <div className='mv3'>
                  <label className='db fw6 lh-copy f6' htmlFor='last-name'>
                    Phone Number
                  </label>
                  <Cleave
                    className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                    onChange={(event) =>
                      setPhoneNumber(event.currentTarget.value)
                    }
                    value={phoneNumber}
                    options={{ phone: true, phoneRegionCode: 'US' }}
                  />
                </div>
              </>
            ) : (
              ''
            )}
            <div className='mt1'>
              <label className='db fw6 lh-copy f6' htmlFor='email-address'>
                Email
              </label>
              <input
                className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                type='email'
                value={email}
                onChange={(event) => {
                  setEmail(event.currentTarget.value);
                  setError('');
                }}
              />
              <small id='name-desc' className='hljs-strong f6 red db mb2'>
                {error}
              </small>
            </div>
            <div className='mv3'>
              <label className='db fw6 lh-copy f6' htmlFor='password'>
                Password
              </label>
              <input
                className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                type='password'
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
              />
            </div>
            {!signUp ? (
              <label className='pa0 ma0 lh-copy f6 pointer'>
                <input type='checkbox' /> Remember me
              </label>
            ) : (
              ''
            )}
          </fieldset>
          <div className=''>
            <input
              className='b ph3 pv2 link input-reset ba b--black bg-transparent grow pointer f6 dib'
              type='submit'
              value={signUp ? 'Sign up' : 'Sign in'}
              onClick={signUp ? handleSignUp : handleLogin}
            />
          </div>
          <div className='lh-copy mt3'>
            {signUp ? (
              <a href='/login' className='f6 link dim black db'>
                Already have an account? Sign in
              </a>
            ) : (
              <a href='/signup' className='f6 link dim black db'>
                Sign up
              </a>
            )}
            <a href='#0' className='f6 link dim black db'>
              Forgot your password?
            </a>
          </div>
        </form>
      </main>
    </>
  );
};
export default LoginForm;
