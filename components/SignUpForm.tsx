import { Input, Radio } from 'antd';
import 'antd/dist/antd.css';
import { RadioChangeEvent } from 'antd/lib/radio';
import axios from 'axios';
import 'cleave.js/dist/addons/cleave-phone.us';
import Cleave from 'cleave.js/react';
import React, { useState } from 'react';
import QuestionController from './QuestionController';

const SignUpForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [handle, setHandle] = useState<string>('');
  const [question, setQuestion] = useState<number>(0);
  const [answer, setAnswer] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [wager, setWager] = useState<number>(1);
  const [selected, setSelected] = useState<number>(1);

  const changeGame = () => {
    setSelected(1);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLElement>) => {
    const date = new Date();
    event.preventDefault();
    await axios({
      method: 'post',
      url: '/api/game',
      data: {
        question,
        email,
        answer,
        name,
        city,
        phoneNumber,
        handle,
        wager,
        date,
      },
    }).then(() => {
      setSelected(3);
    });
  };

  const selectGame = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    game: number,
  ) => {
    event.preventDefault();
    setQuestion(game);
    setSelected(2);
  };

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };
  return (
    <>
      {selected === 1 && (
        <>
          <p className='description'>
            This is how it works....
            <br />
            <br />
            Every week, we will host contests with up to three questions about
            things happening currently in the rap game. <br />
            <br />
            This is a chance for you and your friends to put your intuition on
            the line! These questions will be regarding releases and predictions
            and we will use data and announcements to determine each weeks
            winners. <br />
            <br />
            Weekly earnings can either be cashed out or converted into clout
            tokens for future gameplay. Every contestant will be notified when
            the results are revealed.
          </p>
          <div className='header'>Select your game</div>

          <div className='row'>
            <a
              href='#'
              onClick={(event) => selectGame(event, 1)}
              className='not-active'>
              <h3>Game #1 &rarr;</h3>
              <p>
                The Game and Fab drop Nov.29th w/ 'Born 2 Rap and 'SS3'. Who
                will sell more in the first week?
              </p>
              <br />
              <div className='card-status'>Ended 12/6</div>
            </a>

            <a
              href='#'
              onClick={(event) => selectGame(event, 2)}
              className='card'>
              <h3>Game #2 &rarr;</h3>
              <p>
                Larry June has dropped five projects in 2019. Will he close out
                2019 with a 6th?
              </p>
              <br />
            </a>
          </div>
          <div className='row'>
            <a
              href='#'
              onClick={(event) => selectGame(event, 3)}
              className='card'>
              <h3>Game #3 &rarr;</h3>
              <p>Who gonna have the next banger? Pop Smoke or Fivio Foreign</p>
              <br />
            </a>
            <a
              href='#'
              onClick={(event) => selectGame(event, 4)}
              className='card'>
              <h3>Game #4 &rarr;</h3>
              <p>
                Buddy is going on tour very soon. He recently asked his fans to
                suggest his opening act. Who do you believe it will be?
              </p>
              <br />
            </a>
            <a
              href='#'
              onClick={(event) => selectGame(event, 5)}
              className='card'>
              <h3>Game #5 &rarr;</h3>
              <p>
                Friday December 6th the followingn albums drop. In which order
                will these chart for the 1st week sales? Parlay winner wins x 3.
              </p>
              <br />
            </a>
          </div>
        </>
      )}

      {selected === 2 && (
        <>
          <p className='description'>
            This is how it works....
            <br />
            <br />
            Every week, we will host contests with up to 3 questions about
            things happening currently in the rap game. <br />
            <br />
            This is a chance for you and your friends to put your intuition on
            the line! These questions will be regarding releases and predictions
            and we will use data and announcements to determine each weeks
            winners. <br />
            <br />
            Weekly earnings can either be cashed out or converted into clout
            tokens for future gameplay. Every contestant will be notified when
            the results are revealed.
          </p>
          <div className='row'>
            <div className='card'>
              <h3>Sign up</h3>
              <br />
              <form onSubmit={handleSubmit} className='rsvp-form'>
                <div className='rsvp-form'>
                  <label htmlFor='name'>Name: </label>
                  <br />
                  <Input
                    type='text'
                    value={name}
                    onChange={(event) => setName(event.currentTarget.value)}
                    name='name'
                    required={true}
                  />
                </div>
                <br />
                <div className='rsvp-form'>
                  <label htmlFor='email'>Email address: </label>
                  <br />
                  <Input
                    type='email'
                    value={email}
                    onChange={(event) => setEmail(event.currentTarget.value)}
                    name='email'
                    required={true}
                  />
                </div>

                <br />
                <div className='rsvp-form'>
                  <label htmlFor='name'>Where you from?: </label>
                  <br />
                  <Input
                    type='text'
                    value={city}
                    onChange={(event) => setCity(event.currentTarget.value)}
                    name='city'
                    required={true}
                  />
                </div>
                <br />
                <div className='rsvp-form'>
                  <label htmlFor='email'>IG or Twitter @: </label>
                  <br />
                  <Input
                    type='text'
                    value={handle}
                    onChange={(event) => setHandle(event.currentTarget.value)}
                    name='handle'
                    id='handle'
                  />
                </div>
                <br />

                <div className='rsvp-form'>
                  <label htmlFor='email'>Select your wager:</label>
                  <br />
                  <Radio.Group
                    onChange={(event: RadioChangeEvent) =>
                      setWager(Number(event.target.value))
                    }>
                    <Radio style={radioStyle} value={1}>
                      $1
                    </Radio>
                    <Radio style={radioStyle} value={5}>
                      $5
                    </Radio>
                    <Radio style={radioStyle} value={10}>
                      $10
                    </Radio>
                  </Radio.Group>
                </div>
                <br />
                <div className='rsvp-form'>
                  <label htmlFor='phone-number'>Phone Number</label>

                  <Cleave
                    className='ant-input'
                    onChange={(event) =>
                      setPhoneNumber(event.currentTarget.value)
                    }
                    options={{ phone: true, phoneRegionCode: 'US' }}
                  />
                </div>
                <QuestionController
                  answer={answer}
                  question={question}
                  setAnswer={setAnswer}
                />
                <br />
                <br />
                <button>Play</button>
                <button onClick={changeGame}>Change Game</button>
              </form>
            </div>
          </div>
        </>
      )}
      {selected === 3 && (
        <div className='row'>
          <div className='description'>
            <p>
              Your Submission been received!
              <br />
              <br />
              <strong>
                Expect a text with instructions to complete your wager via CASH
                APP. Your entry is not valid until we receive confirmation of
                your wager via Cash App.
              </strong>
              <br />
              <br />
              All pay outs will be dispersed through Cash App as well. Winnings
              can be used for future gameplay.
              <br />
              <br />
              If you did not receive a text, you can click below to pay as well
              <br />
              <br />
              <a href={`https://cash.app/$Cloutyio/${wager}`}>
                <img className='cashapp' src='/static/img/cashapp.png' />
              </a>{' '}
              <br />
              <br />
              The final entry date is <strong>Tuesday, December 3rd.</strong>
              <br />
              <br />
              <br />
              <i>
                For all issues please email{' '}
                <a href='mailto: payments@clouty.io'> payments@clouty.io</a>.
                For all media inquiries please email
                <a href='mailto: breemz@clouty.io'> breemz@clouty.io</a>
              </i>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUpForm;
