import axios from 'axios';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import Router from 'next/router';
import React, { useState } from 'react';
import { colorways } from '../../lib/helpers';
interface Option {
  value: string;
}
interface Question {
  gameType: string;
}
interface GameProps {
  options: Option[];
  description: string;
  emoji: string;
  visible: boolean;
  slug: string;
  number: string;
  answer: string;
  class: string;
  extendedAnswer: string;
  gameType: string;
  question: string;
  game: GameProps;
}
interface CreateGameFormProps {
  title: string;
  options: Option[];
  description: string;
  emoji: string;
  visible: boolean;
  gameType: string;
  slug: string;
  extendedAnswer: string;
  number: string;
  colorway: string;
  questions: Question[];
  game: GameProps;
  isUserSubmission: boolean;
  userId: string;
}

const CreateGameForm: React.FC<CreateGameFormProps> = ({
  game,
  questions,
  isUserSubmission,
  userId,
}) => {
  const [description, setDescription] = useState<string>(
    game ? game.description : '',
  );
  const [emoji, setEmoji] = useState<any>(game ? game.emoji : '🏆');
  const [answer, setAnswer] = useState<any>(game ? game.answer : '');
  const [extendedAnswer, setExtendedAnswer] = useState<any>(
    game ? game.answer : '',
  );
  const [option, setOption] = useState<string>('');
  const [options, setOptions] = useState<any[]>(game ? game.options : []);
  const [gameType] = useState<string>(game ? game.gameType : 'game');
  const [visible, setVisible] = useState<boolean>(false);
  const [answerVisible, setAnswerVisible] = useState<boolean>(
    game && game.answer ? true : false,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [colorway, setColorway] = useState<string>(
    game ? game.class : 'trillectro',
  );
  const newGame = game ? false : true;
  const grammy = game && game.gameType === 'grammy';

  const number = newGame
    ? (
        questions.filter((curr) => curr.gameType !== 'grammy').length + 4
      ).toString()
    : game.question;

  const slug = !newGame ? game.slug : number;
  const currentGame = {
    description,
    emoji: emoji.native ? emoji.native : emoji,
    options,
    slug,
    class: colorway,
    answer,
    extendedAnswer,
    gameType,
    question: number,
  };

  const handleSubmit = async () => {
    setLoading(true);
    const submission = {
      description,
      emoji: emoji.native ? emoji.native : emoji,
      options,
      answer,
      type: 'select',
      gameType,
      slug,
      date: new Date(),
      extendedAnswer: answer,
      class: colorway,
      question: number,
      userId,
    };
    if (isUserSubmission) {
      axios.post('/api/userquestion', submission).then(() => {
        Router.push('/games/create/confirmation');
      });
    } else {
      axios.post('/api/question', submission).then(() => {
        Router.push('/dashboard/edit');
      });
    }
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
  const removeGame = () => {
    axios.delete(`/api/question/${currentGame.slug}`).then(() => {
      Router.push('/dashboard/edit');
    });
  };
  const emojiSet = (e: any) => {
    setEmoji(e);
    renderEmoji();
  };
  const closeGame = () =>
    axios.post(`/api/endQuestion/${currentGame.slug}`).then(() => {
      Router.push('/dashboard/edit');
    });

  const renderEmoji = () => setVisible(!visible);

  const addAnswer = () => setAnswerVisible(!answerVisible);

  const removeAnswer = () => {
    setAnswer('');
    setAnswerVisible(!answerVisible);
  };

  const removeOption = (event: React.MouseEvent<HTMLElement>) => {
    const deleteIndex = event.currentTarget.getAttribute('data-option-index');
    const updatedOptions = [...options];
    updatedOptions.splice(Number(deleteIndex), 1);
    setOptions(updatedOptions);
  };

  const submitAction = isUserSubmission
    ? loading
      ? 'Submitting...'
      : 'Submit Game'
    : loading
    ? 'Updating...'
    : 'Update Game';
  return (
    <>
      <article className='pa4 black-80'>
        <form action='sign-up_submit' method='get' acceptCharset='utf-8'>
          {visible ? (
            <div className='dt mw9 center pv4 pv5-m '>
              <div className='dtc v-top'>
                <Picker onSelect={emojiSet} />
              </div>
            </div>
          ) : (
            <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
              <legend className='ph0 mh0 fw6 clip'>Sign Up</legend>
              <div className='mt3'>
                <label className='db fw4 lh-copy f6' htmlFor='email-address'>
                  Game Question
                </label>
                <textarea
                  id='comment'
                  name='comment'
                  className='db h4 border-box hover-black w-100 measure ba b--black pa2 br2 mb2'
                  aria-describedby='comment-desc'
                  value={description}
                  onChange={(event) =>
                    setDescription(event.currentTarget.value)
                  }
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
                <div className='mt3'>
                  <span
                    className='b ph2 mr2 pv2 input-reset ba b--black bg-transparent grow pointer f6'
                    onClick={addOption}>
                    Add Option
                  </span>
                </div>
              </div>
              {!answerVisible ? (
                <div className='mt3'>
                  <strong>Options:</strong>
                  {options.map((opt, index) => {
                    return (
                      <div
                        data-option-index={index}
                        onClick={removeOption}
                        key={index}>
                        <div className='flex'>
                          <div className='f6 link dim ph2 pv2 mb2 dib white bg-red'>
                            X
                          </div>
                          <div className={'ma2'}>{opt.value}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className='mt3'>
                  <strong>Select Answer:</strong>
                  {options.map((opt, index) => {
                    return (
                      <div
                        data-option-index={index}
                        onClick={() => setAnswer(opt.value)}
                        key={index}>
                        <div className='flex'>
                          {opt.value !== answer ? (
                            <div className='f6 link dim ph2 pv2 mb2 dib white bg-blue'>
                              +
                            </div>
                          ) : (
                            <div className='f6 link dim ph2 pv2 mb2 dib white bg-green'>
                              :)
                            </div>
                          )}
                          <div className={'ma2'}>{opt.value}</div>
                        </div>
                      </div>
                    );
                  })}
                  <div className='mt3'>
                    <label className='db fw4 lh-copy f6' htmlFor='password'>
                      Extended Answer
                    </label>
                    <input
                      className='b pa2 input-reset ba bg-transparent'
                      value={extendedAnswer}
                      onChange={(event) =>
                        setExtendedAnswer(event.currentTarget.value)
                      }
                    />
                  </div>
                </div>
              )}
            </fieldset>
          )}

          <div className='flex'>
            <div className='mt3'>
              <span
                className='b mr2 ph2 pv2 input-reset ba b--black bg-transparent grow pointer f6'
                onClick={changeColor}>
                Change Color
              </span>
            </div>

            <div className='mt3'>
              <span
                className='b ph2 mr2 pv2 input-reset ba b--black bg-transparent grow pointer f6'
                onClick={renderEmoji}>
                Set Emoji
              </span>
            </div>
            {answerVisible && (
              <div className='mt3'>
                <span
                  className='b ph2 mr2 pv2 input-reset ba b--black bg-transparent grow pointer f6'
                  onClick={removeAnswer}>
                  Remove Answer
                </span>
              </div>
            )}
            {!isUserSubmission && !answerVisible && (
              <div className='mt3'>
                <span
                  className='b ph2 mr2 pv2 input-reset ba b--black bg-transparent grow pointer f6'
                  onClick={addAnswer}>
                  Set Answer
                </span>
              </div>
            )}
          </div>
        </form>
      </article>
      <section className='flex flex-wrap'>
        <div key={'work'} className='pv2 pa2-ns w-100 w-100-ns'>
          <a className='no-underline white'>
            <div
              className={`white br2 shadow-4 pa3 pa4-ns h-100 ${currentGame.class}`}>
              <h1 className='f4 mt0 fw7'>
                <span role='img' aria-label={currentGame.emoji}>
                  {currentGame.emoji}
                </span>
                {`${
                  currentGame.gameType === 'game'
                    ? `Game #${currentGame.question}`
                    : currentGame.question
                }`}
              </h1>
              <p>
                {grammy
                  ? game.description.split('/').map((curr, i) => {
                      return (
                        <div key={i} className='mv2'>
                          {curr.split(',')[0]} -{' '}
                          <strong>{curr.split(',')[1]}</strong>{' '}
                        </div>
                      );
                    })
                  : currentGame.description}
              </p>
              {currentGame.answer && (
                <>
                  <div className='f5 mt0 fw7'>Winning bet:</div>{' '}
                  <div className='f4 mt0 fw7'>{currentGame.answer}</div>
                </>
              )}
            </div>
          </a>
        </div>
        <div className='flex'>
          <div className='mt3'>
            <div
              className='f6 mr2 link dim ph3 pv2 mb2 dib white bg-black'
              onClick={handleSubmit}>
              {loading && <i className='fa fa-spinner fa-spin' />}{' '}
              {submitAction}
            </div>
          </div>
          {!newGame ? (
            <div>
              <div className='mt3'>
                <span
                  className='f6 mr2 link dim ph3 pv2 mb2 dib white bg-black'
                  onClick={removeGame}>
                  Remove Game
                </span>

                <span
                  className='f6 mr2 link dim ph3 pv2 mb2 dib white bg-black'
                  onClick={closeGame}>
                  Close Game
                </span>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </section>
    </>
  );
};

CreateGameForm.defaultProps = {
  isUserSubmission: false,
};

export default CreateGameForm;
