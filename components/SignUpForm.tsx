import { Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import axios from 'axios';

import 'cleave.js/dist/addons/cleave-phone.us';
import Cleave from 'cleave.js/react';
import React, { useState } from 'react';
import games from '../lib/games';
import Question from './Question';
interface SignUpFormProps {
  gameID: string;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ gameID }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [handle, setHandle] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [wager, setWager] = useState<number>();
  const gameIndex = games.findIndex((game) => game.slug === gameID);
  const game = games[gameIndex];

  const handleSubmit = async (event: React.FormEvent<HTMLElement>) => {
    const date = new Date();
    const userSubmission = {
      email,
      answer,
      name,
      phoneNumber,
      handle,
      wager,
      date,
    };
    event.preventDefault();
    await axios({
      method: 'post',
      url: '/api/game',
      data: userSubmission,
    }).then(() => {
      window.location.href = `/confirmation/${wager}`;
    });
  };

  return (
    <div className='row'>
      <div className='form-card'>
        <br />
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={name}
            placeholder='Name'
            onChange={(event) => setName(event.currentTarget.value)}
            name='name'
            required={true}
          />
          <div>
            <input
              type='email'
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
              placeholder='IG/Twitter Handle'
              onChange={(event) => setHandle(event.currentTarget.value)}
              name='handle'
              id='handle'
            />
          </div>
          <br />
          <div>
            <label htmlFor='email'>Select your wager:</label>
            <Radio.Group
              onChange={(event: RadioChangeEvent) =>
                setWager(Number(event.target.value))
              }>
              <Radio className='radio' value={1}>
                $1
              </Radio>
              <br />
              <Radio className='radio' value={5}>
                $5
              </Radio>
              <br />
              <Radio className='radio' value={10}>
                $10
              </Radio>
            </Radio.Group>
          </div>
          <br />
          <div>
            <Cleave
              className='ant-input'
              placeholder='Phone Number'
              onChange={(event) => setPhoneNumber(event.currentTarget.value)}
              options={{ phone: true, phoneRegionCode: 'US' }}
            />
          </div>
          <Question
            type={game.type}
            options={game.options}
            title={game.title}
            setAnswer={setAnswer}
          />
          <br />
          <br />
          {phoneNumber && answer && wager && name && email && (
            <span
              onClick={handleSubmit}
              className='bg-white-30 pv1 ph2 f7 f6-ns br-pill b noselect'>
              <span className='pl1 sans-serif'>Submit </span>
            </span>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
