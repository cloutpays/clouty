import axios from 'axios';
import 'emoji-mart/css/emoji-mart.css';
import Router from 'next/router';
import React, { useState } from 'react';
import Firebase from '../lib/firebase';
import { setCookie } from '../lib/session';

interface LoginFormProps {
  email: string;
  password: string;
}
const LoginForm: React.FC<LoginFormProps> = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // const handleSignUp = () => {
  //   if (!(email && password)) {
  //     console.log('error', 'Please fill in email. and password');
  //     return;
  //   }
  //   let isError = false;
  //   Firebase.signup({ email, password })
  //     .catch((result) => {
  //       const message =
  //         result && result.message ? result.message : 'Sorry Some error occurs';
  //       console.log('error', message);
  //       isError = true;
  //     })
  //     .then((result) => {
  //       if (isError) {
  //         return;
  //       }

  //       console.log(result);
  //     });
  // };
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
        Router.push('/');
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
  //   const handleSubmit = async () => {
  // const submission = {
  //   description,
  //   emoji: emoji.native ? emoji.native : emoji,
  //   options,
  //   answer,
  //   type: 'select',
  //   gameType: 'game',
  //   slug: number,
  //   class: colorway,
  //   question: number,
  // };
  // axios.post('/api/question', submission).then(() => {
  //   Router.push('/dashboard/edit');
  // });
  //   };

  return (
    <>
      <main className='pa4 black-80'>
        <form className='measure center'>
          <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
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
            <label className='pa0 ma0 lh-copy f6 pointer'>
              <input type='checkbox' /> Remember me
            </label>
          </fieldset>
          <div className=''>
            <input
              className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
              type='submit'
              value='Sign in'
              onClick={handleLogin}
            />
          </div>
          <div className='lh-copy mt3'>
            <a href='#0' className='f6 link dim black db'>
              Sign up
            </a>
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
