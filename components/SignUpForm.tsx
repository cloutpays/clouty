import { Form, Input, message, Radio } from 'antd';
// import 'antd/dist/antd.css';
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
    const userSubmission = {
      question,
      email,
      answer,
      name,
      city,
      phoneNumber,
      handle,
      wager,
      date,
    };
    const isEmpty = (val: string) => {
      return val === '';
    };

    // temporary until i enabled required fields
    if (isEmpty(userSubmission.phoneNumber) || isEmpty(userSubmission.answer)) {
      message.warning('Please fill all fields');
    }
    event.preventDefault();

    await axios({
      method: 'post',
      url: '/api/game',
      data: userSubmission,
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

  return (
    <>
      {selected === 1 && (
        <>
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
          </div>
          <div className='row'>
            <a
              href='#'
              onClick={(event) => selectGame(event, 5)}
              className='card'>
              <h3>Game #5 &rarr;</h3>
              <p>
                Friday December 6th the following albums drop. In which order
                will these chart for the 1st week sales? Parlay winner wins x 3.
              </p>
              <br />
            </a>
            <a
              href='#'
              onClick={(event) => selectGame(event, 6)}
              className='card'>
              <h3>Game #6 &rarr;</h3>
              <p>
                Our favorite songs usually aren’t the ones that make it to the
                radio. The masses tend to eat whatever they're fed. What song
                off Roddy Rich’s project is going to be the “Single Single”
                (radio friendly smash) (post album drop)
              </p>
              <br />
            </a>
          </div>
        </>
      )}

      {selected === 2 && (
        <>
          <div className='row'>
            <div className='form-card'>
              <h3>Sign up</h3>
              <br />
              <Form onSubmit={handleSubmit}>
                <Form.Item label='Name' hasFeedback={true}>
                  <Input
                    type='text'
                    value={name}
                    onChange={(event) => setName(event.currentTarget.value)}
                    name='name'
                    required={true}
                  />
                </Form.Item>
                <div>
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
                <div>
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
                <div>
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

                <div>
                  <label htmlFor='email'>Select your wager:</label>
                  <br />
                  <Radio.Group
                    onChange={(event: RadioChangeEvent) =>
                      setWager(Number(event.target.value))
                    }>
                    <Radio className='radio' value={1}>
                      $1
                    </Radio>
                    <Radio className='radio' value={5}>
                      $5
                    </Radio>
                    <Radio className='radio' value={10}>
                      $10
                    </Radio>
                  </Radio.Group>
                </div>
                <br />
                <div>
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
              </Form>
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
