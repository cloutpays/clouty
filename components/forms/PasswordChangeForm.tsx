import React, { useState } from 'react';
import { styles } from '../../constants/styles';
import Firebase from '../../lib/firebase';

interface ErrorState {
  message: string;
}

const fireBaseError: ErrorState = {
  message: '',
};

const PasswordChangeForm = () => {
  const [passwordOne, setPasswordOne] = useState<string>('');
  const [passwordTwo, setPasswordTwo] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorState>({ ...fireBaseError });
  const [confirmation, setConfirmation] = useState<boolean>(false);

  const onSubmit = async () => {
    setLoading(true);
    await Firebase.updatePassword(passwordOne)
      .then(() => {
        setPasswordOne('');
        setPasswordTwo('');
        setError({ ...fireBaseError });
        setConfirmation(true);
        setTimeout(() => {
          window.history.back();
        }, 2000);
      })
      .catch((error) => {
        setError(error);
      });
    setLoading(false);
  };

  const onChangePasswordOne = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordOne(event.currentTarget.value);
  };

  const onChangePasswordTwo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordTwo(event.currentTarget.value);
  };

  const isInvalid = passwordOne !== passwordTwo;

  return (
    <>
      {!confirmation ? (
        <main className='black-80'>
          <form className='measure center'>
            <fieldset id='reset_password' className='ba b--transparent ph0 mh0'>
              <div className='mt1'>
                <label className='db fw6 lh-copy f6' htmlFor='email-address'>
                  New Password
                </label>
                <input
                  className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  type='password'
                  name='passwordOne'
                  value={passwordOne}
                  onChange={onChangePasswordOne}
                />
                <label className='db fw6 lh-copy f6' htmlFor='email-address'>
                  Confirm New Password
                </label>
                <input
                  className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  type='password'
                  name='passwordTwo'
                  value={passwordTwo}
                  onChange={onChangePasswordTwo}
                />
                <small id='name-desc' className='hljs-strong f6 red db mb2'>
                  {error.message.length > 0 && <p>{error.message}</p>}
                  {isInvalid && <p>{'Passwords do not match'}</p>}
                </small>
              </div>
            </fieldset>
            <div>
              <button
                type='button'
                disabled={passwordOne === ''}
                onClick={onSubmit}
                className='b ph3 pv2 link input-reset ba b--black bg-transparent grow pointer f6 dib'>
                {loading && <i className='fa fa-spinner fa-spin' />}
                Change my password
              </button>
            </div>
          </form>
        </main>
      ) : (
        <section className='ma3 ma4-l'>
          <p className={styles.paragraph}>
            Your password has been changed successfully! You'll redirected back
            to the previous page you were on.
          </p>
        </section>
      )}
    </>
  );
};

export default PasswordChangeForm;
