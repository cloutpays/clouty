import { Form, Input, Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
// import axios from 'axios';
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
  const [wager, setWager] = useState<number>(1);
  const gameIndex = games.findIndex((game) => game.slug === gameID);
  const game = games[gameIndex];
  console.log(game, phoneNumber, wager, answer);
  // const [selected, setSelected] = useState<number>(2);
  // const changeGame = () => {
  //   setSelected(1);
  // };

  const handleSubmit = async (event: React.FormEvent<HTMLElement>) => {
    console.log(event);
    // const date = new Date();
    // const userSubmission = {
    //   email,
    //   // answer,
    //   name,
    //   phoneNumber,
    //   handle,
    //   wager,
    //   date,
    // };
    // const isEmpty = (val: string) => {
    //   return val === '';
    // };
    // temporary until i enabled required fields
    //   if (isEmpty(userSubmission.phoneNumber) || isEmpty(userSubmission.answer)) {
    //     message.warning('Please fill all fields');
    //   }
    //   event.preventDefault();
    //   await axios({
    //     method: 'post',
    //     url: '/api/game',
    //     data: userSubmission,
    //   }).then(() => {});
  };

  return (
    <div className='row'>
      <div className='form-card'>
        <br />
        <Form onSubmit={handleSubmit}>
          <Form.Item hasFeedback={true}>
            <Input
              type='text'
              value={name}
              placeholder='Name'
              onChange={(event) => setName(event.currentTarget.value)}
              name='name'
              required={true}
            />
          </Form.Item>
          <div>
            <Input
              type='email'
              placeholder='Email address'
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
              name='email'
              required={true}
            />
          </div>
          <div>
            <Input
              type='text'
              value={handle}
              placeholder='IG or Twitter @: '
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
        </Form>
      </div>
    </div>
  );
};

export default SignUpForm;
