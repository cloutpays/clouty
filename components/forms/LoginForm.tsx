import axios, { AxiosResponse } from 'axios';
import 'cleave.js/dist/addons/cleave-phone.us';
import Cleave from 'cleave.js/react';
import 'emoji-mart/css/emoji-mart.css';
import Link from 'next/link';
import Router from 'next/router';
import React, { useState } from 'react';
import Firebase from '../../lib/firebase';
import { setCookie } from '../../lib/session';

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
  const [userName, setUserName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [signUpText, setSignUpText] = useState<string>('Submit');
  const [signInText, setSignInText] = useState<string>('Sign In');

  const [error, setError] = useState<string>('');
  const signUp = mode === 'signup';

  const handleSignUp = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    setSignUpText('Signing Up...');
    setLoading(true);
    if (!(email && password)) {
      setError('Please fill in email and password');
      setSignUpText('Submit');
      return;
    }
    let isError = false;
    Firebase.signup({ email, password })
      .catch((result) => {
        const message =
          result && result.message ? result.message : 'Sorry Some error occurs';
        isError = true;
        setLoading(false);
        setError(message);
        setSignUpText('Submit');
      })
      .then((result: any) => {
        if (isError) {
          return setLoading(false);
        }
        if (typeof result !== 'undefined') {
          axios
            .post('/api/user', {
              data: {
                firebase: result.user,
                email: result?.user?.email,
                new: true,
                info: { firstName, lastName, phoneNumber, userName },
              },
            })
            .then(() => {
              setCookie('id_token', result.user.uid);
              Router.push('/user');
            });
        }
      });
  };
  const handleLogin = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    setSignInText('Signing In...');
    setLoading(true);
    if (!(email && password)) {
      setError('Please fill in email and password');
      setSignInText('Sign In');
      setLoading(false);
      return;
    }

    let isError = false;
    Firebase.login(Firebase.EMAIL, { email, password })
      .catch((result: any) => {
        const message =
          result && result.code.split('/')[1] === 'user-not-found'
            ? "Sorry, we couldn't find an account with that username. Please try again."
            : "Sorry, that password isn't right. Please try again.";
        setError(message);
        setSignInText('Sign In');
        setLoading(false);
        isError = true;
      })
      .then((result: { message: any; user: { uid: string } }) => {
        if (isError) {
          return;
        }
        setCookie('id_token', result.user.uid);
        axios
          .post('/api/user', { data: { firebase: result.user } })
          .then((res: AxiosResponse) => {
            const user = res.data;
            if (user.admin) {
              setCookie('id_token_a', true);
            }
            Router.push('/user');
          });
      });
  };

  return (
    <>
      <style jsx={true}>{`
        .fa {
          margin-left: -12px;
          margin-right: 8px;
        }
      `}</style>
      <div className='black-80 center ma3 measure'>
        <form>
          <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
            {signUp ? (
              <>
                {' '}
                <div className='form-flex'>
                  <div className='first-name'>
                    <label className='db fw6 lh-copy f6' htmlFor='first-name'>
                      First Name
                    </label>
                    <input
                      className='form-control '
                      type='name'
                      value={firstName}
                      onChange={(event) =>
                        setFirstName(event.currentTarget.value)
                      }
                    />
                  </div>
                  <div className='last-name'>
                    <label className='db fw6 lh-copy f6' htmlFor='last-name'>
                      Last Name
                    </label>
                    <input
                      className='form-control'
                      type='name'
                      value={lastName}
                      onChange={(event) =>
                        setLastName(event.currentTarget.value)
                      }
                    />
                  </div>
                </div>
                <div className='mv3'>
                  <label className='db fw6 lh-copy f6' htmlFor='user-name'>
                    User Name
                  </label>
                  <input
                    className='form-control'
                    onChange={(event) => setUserName(event.currentTarget.value)}
                    value={userName}
                    placeholder='@ '
                  />
                </div>
                <div className='mv3'>
                  <label className='db fw6 lh-copy f6' htmlFor='last-name'>
                    Phone Number
                  </label>
                  <Cleave
                    className='form-control'
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
                className='form-control'
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
                className='form-control'
                type='password'
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
              />
            </div>
          </fieldset>
          <div className={signUp ? 'text-center' : ''}>
            <button
              className='btn btn-default'
              onClick={signUp ? handleSignUp : handleLogin}>
              {loading && <i className='fa fa-spinner fa-spin' />}
              {signUp ? signUpText : signInText}
            </button>
          </div>
          {signUp && (
            <div className='login-links have-account'>
              <a href='/login' className='f5 link dim black db'>
                Already have an account?{' '}
                <span className='fw5 link no-underline bb bw1 dim '>
                    Log in
                  </span>
              </a>
            </div>
          )}
          {signUp && (
            <div className='pa0 ma0  terms  black login-links'>
              By clicking "Submit" confirms you're age 18+ and agree to our{' '}
              <a
                className='fw5 link no-underline bb bw1 dim black'
                href='/terms'>
                Terms
              </a>{' '}
              &{' '}
              <a
                className='fw5 link no-underline bb bw1 dim black'
                href='/terms'>
                Privacy Policy
              </a>
              . You may receive SMS Notifications from us and can opt out any
              time.
            </div>
          )}
          <div className='margin-actions'>
            {!signUp && (
              <div>
                <Link href='/user/pw-forget'>
                  <a className='link forgot bb bw1 dim black'>
                    Forgot your password?
                  </a>
                </Link>
                <a href='/signup' className='f5 signUp link dim black db mt-3'>
                  Don't have an account?{' '}
                  <span className='fw5 link no-underline bb bw1 dim '>
                    Sign Up
                  </span>
                </a>
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
};
export default LoginForm;
