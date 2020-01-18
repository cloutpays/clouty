import axios from 'axios';
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
}
const LoginForm: React.FC<LoginFormProps> = ({ mode }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const signUp = mode === 'signup';
  const handleSignUp = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();

    if (!(email && password)) {
      // console.log('error', 'Please fill in email. and password');
      return;
    }
    let isError = false;
    Firebase.signup({ email, password })
      .catch(() => {
        // const message =
        //   result && result.message ? result.message : 'Sorry Some error occurs';
        // console.log('error', message);
        isError = true;
      })
      .then(() => {
        if (isError) {
          return;
        }
        // axios.post('/api/user', { data: result.user }).then(() => {
        //   // console.log(res);
        // });
        // console.log(result);
      });
  };
  const handleLogin = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();

    if (!(email && password)) {
      // console.log('error', 'Please fill in email. and password');
      return;
    }

    let isError = false;
    Firebase.login(Firebase.EMAIL, { email, password })
      .catch(() => {
        // const message =
        //   result && result.message ? result.message : 'Sorry Some error occurs';
        // console.log('error', message);

        isError = true;
      })
      .then((result: { message: any; user: { uid: string } }) => {
        if (isError) {
          return;
        }
        // console.log(result);
        setCookie('id_token', result.user.uid);
        Router.push('/dashboard');
        if (!result || result.message) {
          // const message =
          //   result && result.message
          //     ? result.message
          //     : 'Sorry Some error occurs';
          // console.log('error', message);
        } else {
          axios.post('/api/user', { data: result.user }).then(() => {
            // console.log(res);
          });
        }
      });
  };

  return (
    <>
      <main className='pa4 black-80'>
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
                onChange={(event) => setEmail(event.currentTarget.value)}
              />
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
              className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
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
