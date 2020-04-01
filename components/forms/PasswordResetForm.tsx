import Link from 'next/link';
import React, { useState } from 'react';
import { styles } from '../../constants/styles';
import Firebase from '../../lib/firebase';

interface PasswordResetFromProps {
  email: string;
}

interface ErrorState {
  message: string;
}

const fireBaseError: ErrorState = {
  message: '',
};

const PasswordResetForm: React.FC<PasswordResetFromProps> = ({
  email: initEmail,
}) => {
  const [email, setEmail] = useState<string>(initEmail || '');
  const [error, setError] = useState<ErrorState>({ ...fireBaseError });
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmation, setConfirmation] = useState<boolean>(false);

  const onSubmit = async (event: React.FormEvent<HTMLElement>) => {
    setLoading(true);
    await Firebase.resetPassword(email)
      .then(() => {
        setError({ ...fireBaseError });
        setConfirmation(true);
      })
      .catch((error) => {
        setError(error);
      });
    setLoading(false);
    event.preventDefault();
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  return (
    <div className=' vh-50 mb4'>
      {!confirmation ? (
        <main className='black-80'>
          <form className='measure center'>
            <fieldset id='reset_password' className='ba b--transparent ph0 mh0'>
              <div className='mt1'>
                <label className='db fw6 lh-copy f6' htmlFor='email-address'>
                  Email
                </label>
                <input
                  className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  type='email'
                  name='email'
                  value={email}
                  onChange={onChange}
                />
                <small id='name-desc' className='hljs-strong f6 red db mb2'>
                  {error.message.length > 0 && <p>{error.message}</p>}
                </small>
              </div>
            </fieldset>
            <div>
              <button
                type='button'
                onClick={onSubmit}
                className='b ph3 pv2 link input-reset ba b--black bg-transparent grow pointer f6 dib'>
                {loading && <i className='fa fa-spinner fa-spin' />}
                Send reset password link
              </button>
            </div>
          </form>
        </main>
      ) : (
        <section className='ma3 ma4-l'>
          <p className={styles.paragraph}>
            {`A password reset email has been sent to ${email}. Please check your inbox and `}
            <Link href='/login'>
              <a className={styles.link}>Login </a>
            </Link>
            <span role='img' aria-label='Bulleye'>
              🎯‍
            </span>{' '}
          </p>
        </section>
      )}
    </div>
  );
};

export default PasswordResetForm;
