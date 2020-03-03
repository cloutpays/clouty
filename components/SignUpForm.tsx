import axios from 'axios';
import Router from 'next/router';

import 'cleave.js/dist/addons/cleave-phone.us';
import Cleave from 'cleave.js/react';
import React, { useState } from 'react';
import Question from './Question';
interface SignUpFormProps {
  game: any;
  user: any;
  previousBet: any;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ game, user, previousBet }) => {
  const [name, setName] = useState<string>(user ? user.info.firstName : '');
  const [email, setEmail] = useState<string>(user ? user.firebase.email : '');
  const [handle, setHandle] = useState<string>(user ? user.info.firstName : '');
  const [answer, setAnswer] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>(
    user ? user.info.phoneNumber : '',
  );
  const [wager, setWager] = useState<number[]>([1, 5, 10, 20, 50]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLElement>) => {
    if (!loading) {
      setLoading(true);
      const date = new Date();
      const userSubmission = {
        email,
        answer,
        name,
        phoneNumber,
        handle,
        userId: user._id,
        wager: wager[0],
        date,
        question: game.question,
      };
      event.preventDefault();
      await axios({
        method: 'post',
        url: '/api/submission',
        data: { userSubmission, user },
      }).then(() => {
        Router.push(`/confirmation/${wager}`);
      });
    }
  };
  return (
    <div className='row'>
      <div className='form-card'>
        <form onSubmit={handleSubmit}>
          {!previousBet ? (
            // {previousBet.length !== 0 ? (
            <div>
              <p className='b'>You have a hand in this bet.</p>
            </div>
          ) : (
            <>
              {!user && (
                <>
                  <div>
                    <input
                      className='game-input'
                      type='text'
                      value={name}
                      placeholder='Name'
                      onChange={(event) => setName(event.currentTarget.value)}
                      name='name'
                      required={true}
                    />
                  </div>
                  <div>
                    <input
                      type='email'
                      className='game-input'
                      placeholder='Email address'
                      value={email}
                      onChange={(event) => setEmail(event.currentTarget.value)}
                      name='email'
                      required={true}
                    />
                  </div>

                  <div>
                    <input
                      type='text'
                      value={handle}
                      className='game-input'
                      placeholder='IG/Twitter Handle'
                      onChange={(event) => setHandle(event.currentTarget.value)}
                      name='handle'
                      id='handle'
                    />
                  </div>
                </>
              )}
              <div className='mt2'>
                <label className='fw6' htmlFor='email'>
                  Select your wager:
                </label>
                <br />
                <div className='dib-ns'>
                  <div className='flex flex-wrap'>
                    {wager.map((wage, ind) => {
                      return (
                        <div
                          onClick={() => setWager([Number(wage)])}
                          key={ind}
                          className='noselect grow outline dim pa2 mr2 mt2'>
                          <strong>${wage}</strong>
                        </div>
                      );
                    })}
                    {wager.length === 1 && (
                      <div
                        onClick={() =>
                          setWager([
                            Number(1),
                            Number(5),
                            Number(10),
                            Number(20),
                            Number(50),
                          ])
                        }
                        className='noselect grow outline dim pa2 mr2 mt2'>
                        <strong>Reset</strong>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {!user && (
                <>
                  <div>
                    <Cleave
                      className='game-input'
                      placeholder='Phone Number'
                      onChange={(event) =>
                        setPhoneNumber(event.currentTarget.value)
                      }
                      options={{ phone: true, phoneRegionCode: 'US' }}
                    />
                  </div>
                </>
              )}
              <Question
                type={game.type}
                options={game.options}
                title={game.question}
                setAnswer={setAnswer}
              />
              <br />
              {phoneNumber && answer && wager && name && email && (
                <div>
                  {wager[0] > user.stripe.user.balance / 100 ? (
                    <div className='mb2 f7 fw6 '>
                      You have insufficient credits. Reload your balance.
                    </div>
                  ) : (
                    <span
                      onClick={handleSubmit}
                      className='bg-white-30 pv1 pl2 pr3 f7 f6-ns br-pill b noselect'>
                      <span className='pl1 sans-serif'>Play</span>
                    </span>
                  )}
                </div>
              )}
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
