import axios from 'axios';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import Router from 'next/router';
import React, { useState } from 'react';
import colorways from '../lib/colorways';
import SignUpForm from './SignUpForm';
interface Option {
  value: string;
  key: string;
}
interface Question {
  class: string;
}
interface CreateGameFormProps {
  title: string;
  options: Option[];
  description: string;
  emoji: string;
  visible: boolean;
  slug: string;
  number: string;
  colorway: string;
  questions: Question[];
}
const CreateGameForm: React.FC<CreateGameFormProps> = ({ questions }) => {
  const [description, setDescription] = useState<string>('');
  const [emoji, setEmoji] = useState<any>('smiley');
  const [option, setOption] = useState<string>('');
  const [options, setOptions] = useState<any[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [colorway, setColorway] = useState<string>('trillectro');
  const [number] = useState<string>(
    (questions.filter((curr) => curr.class !== 'grammy').length + 1).toString(),
  );

  const game = {
    description,
    emoji: emoji.native,
    options,
    type: 'select',
    answer: null,
    slug: number,
    class: colorway,
    question: number,
  };
  const handleSubmit = async () => {
    const submission = {
      description,
      emoji: emoji.native,
      options,
      type: 'select',
      gameType: 'game',
      slug: (questions.length + 1).toString(),
      class: colorway,
      question: number,
    };
    axios.post('/api/question', submission).then(() => {
      Router.push('/games');
    });
  };
  const changeColor = () => {
    const color = colorways[Math.floor(Math.random() * colorways.length)];
    setColorway(color);
  };
  const addOption = () => {
    const updatedOptions = [
      { key: option, value: option },
      ...(true && options),
    ];

    setOptions(updatedOptions);
    setOption('');
  };
  const emojiSet = (e: any) => {
    setEmoji(e);
    renderEmoji();
  };
  const renderEmoji = () => {
    setVisible(!visible);
  };

  const removeOption = (event: React.MouseEvent<HTMLElement>) => {
    const deleteIndex = event.currentTarget.getAttribute('data-option-index');
    const updatedOptions = [...options];
    updatedOptions.splice(Number(deleteIndex), 1);
    setOptions(updatedOptions);
  };

  return (
    <>
      <article className='pa4 black-80'>
        <form action='sign-up_submit' method='get' acceptCharset='utf-8'>
          <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
            <legend className='ph0 mh0 fw6 clip'>Sign Up</legend>
            <div className='mt3'>
              <label className='db fw4 lh-copy f6' htmlFor='email-address'>
                Game Question
              </label>
              <textarea
                id='comment'
                name='comment'
                className='db border-box hover-black w-100 measure ba b--black pa2 br2 mb2'
                aria-describedby='comment-desc'
                value={description}
                onChange={(event) => setDescription(event.currentTarget.value)}
              />
            </div>
            <div className='mt3'>
              <label className='db fw4 lh-copy f6' htmlFor='password'>
                Option
              </label>
              <input
                className='b pa2 input-reset ba bg-transparent'
                type='text'
                value={option}
                onChange={(event) => setOption(event.currentTarget.value)}
              />
            </div>
          </fieldset>
          <div className='mt3'>
            {options.map((opt, index) => {
              return (
                <div
                  data-option-index={index}
                  onClick={removeOption}
                  key={index}>
                  <h1 className='f4 mt0 fw7'>{`${opt.key}      X`}</h1>
                </div>
              );
            })}
          </div>
          <div className='mt3'>
            <span
              className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6'
              onClick={changeColor}>
              Change Color
            </span>
          </div>
          <div className='mt3'>
            <span
              className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6'
              onClick={addOption}>
              Add Option
            </span>
          </div>
          <div className='mt3'>
            <span
              className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6'
              onClick={renderEmoji}>
              Add Emoji
            </span>
          </div>
          {visible ? (
            <div className='dt mw9 center pv4 pv5-m '>
              <div className='dtc v-top'>
                <Picker onSelect={emojiSet} />
              </div>
            </div>
          ) : (
            ''
          )}
          <div className='mt3'>
            <span
              className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6'
              onClick={handleSubmit}>
              Submit
            </span>
          </div>
        </form>
      </article>
      <section className='flex flex-wrap'>
        <div key={'work-newgame'} className='pv2 pa2-ns w-100 w-100-ns'>
          <a className='no-underline white'>
            <div
              className={`white br2 shadow-4 pa3 pa4-ns h-100 ${game.class}`}>
              <h1 className='f4 mt0 fw7'>
                <span role='img'>{game.emoji}</span>
                {`Game #${number}`}
              </h1>
              <p>{game.description}</p>
              {!game.answer && <SignUpForm game={game} />}
            </div>
          </a>
        </div>
      </section>
    </>
  );
};
export default CreateGameForm;
