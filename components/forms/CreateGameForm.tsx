import axios from 'axios';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import Router from 'next/router';
import React, { useState } from 'react';
import { colorways, formatDate, formatPrice } from '../../lib/helpers';
interface Option {
  value: string;
  odds: string;
}
interface Question {
  gameType: string;
}

interface Submissions {
  _id: string;
  email: string;
  phoneNumber: string;
  wager: number;
  question: string;
  userId: string;
  handle: string;
  won: boolean;
  name: string;
  odds: string;
  details: string;
  date: string;
  answer: string;
  usedCredit: boolean;
}

interface GameProps {
  options: Option[];
  description: string;
  emoji: string;
  showEmojiKeyboard: boolean;
  slug: string;
  number: string;
  answer: string;
  class: string;
  details: string;
  extendedAnswer: string;
  gameType: string;
  question: string;
  game: GameProps;
}
interface CreateGameFormProps {
  title: string;
  houseBalance: number;
  options: Option[];
  description: string;
  emoji: string;
  showEmojiKeyboard: boolean;
  gameType: string;
  slug: string;
  extendedAnswer: string;
  number: string;
  colorway: string;
  questions: Question[];
  submissions: Submissions[];
  game: GameProps;
  isUserSubmission: boolean;
  userId: string;
}

const CreateGameForm: React.FC<CreateGameFormProps> = ({
  game,
  questions,
  isUserSubmission,
  userId,
  submissions,
  houseBalance,
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
  const [details, setDetails] = useState<string>(game ? game.details : '');
  const [gameType, setGameType] = useState<string>(game ? game.gameType : '');
  const [showEmojiKeyboard, setShowEmojiKeyboard] = useState<boolean>(false);
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
    details,
    question: number,
  };

  const handleSubmit = async () => {
    setLoading(true);
    const submission = {
      description,
      emoji: emoji.native ? emoji.native : emoji,
      options,
      answer,
      details,
      gameType,
      slug,
      date: new Date(),
      extendedAnswer: answer,
      class: colorway,
      question: number,
      userId,
    };
    if (isUserSubmission) {
      axios.post('/api/userQuestions', submission).then(() => {
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
    const updatedOptions = [{ odds: 0, value: option }, ...(true && options)];
    setOptions(updatedOptions);
    setOption('');
  };
  const setOdds = (odds: string, value: string) => {
    const updatedOptions = options.filter((curr) => curr.value !== value);
    updatedOptions.push({ odds, value });
    setOptions(updatedOptions);
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

  const renderEmoji = () => setShowEmojiKeyboard(!showEmojiKeyboard);

  const addAnswer = () => setAnswerVisible(!answerVisible);

  const removeAnswer = () => {
    setAnswer('');
    setAnswerVisible(!answerVisible);
  };

  const winBet = (bet: Submissions) => {
    axios
      .post('/api/winBet', {
        submission: bet,
      })
      .then(() => {
        Router.push('/dashboard/edit');
      });
  };
  const loseBet = (bet: Submissions) => {
    axios
      .post('/api/loseBet', {
        submission: bet,
      })
      .then(() => {
        Router.push('/dashboard/edit');
      });
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
    : newGame
    ? loading
      ? 'Creating Game...'
      : 'Create Game'
    : loading
    ? 'Updating...'
    : 'Update Game';
  return (
    <div className='ma3 ma4-l mw8'>
      <article className='ph4 pb4 black-80'>
        <form action='sign-up_submit' method='get' acceptCharset='utf-8'>
          {!showEmojiKeyboard && (
            <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
              <legend className='ph0 mh0 fw6 clip'>Sign Up</legend>
              <div className='mt3'>
                <label
                  className='db fw4 mb2 lh-copy f6'
                  htmlFor='email-address'>
                  Game Type
                </label>

                {gameType === '' && (
                  <>
                    <span
                      className='b ph2 mr2 pv2 input-reset ba b--black bg-transparent grow pointer f6'
                      onClick={() => setGameType('game')}>
                      Normal
                    </span>{' '}
                    <span
                      className='b ph2 mr2 pv2 input-reset ba b--black bg-transparent grow pointer f6'
                      onClick={() => setGameType('fill-in-blank')}>
                      Fill In The Blank
                    </span>
                  </>
                )}
                {gameType === 'game' && (
                  <span
                    className='b ph2 mr2 pv2 input-reset ba b--black bg-transparent grow pointer f6'
                    onClick={() => setGameType('game')}>
                    Normal
                  </span>
                )}
                {gameType === 'fill-in-blank' && (
                  <span
                    className='b ph2 mr2 pv2 input-reset ba b--black bg-transparent grow pointer f6'
                    onClick={() => setGameType('fill-in-blank')}>
                    Fill In The Blank
                  </span>
                )}
              </div>
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
              {!isUserSubmission && (
                <div className='mt3'>
                  <label className='db fw4 lh-copy f6' htmlFor='email-address'>
                    Game Details
                  </label>
                  <textarea
                    id='comment'
                    name='comment'
                    className='db h3 border-box hover-black w-100 measure ba b--black pa2 br2 mb2'
                    aria-describedby='comment-desc'
                    value={details}
                    onChange={(event) => setDetails(event.currentTarget.value)}
                  />
                </div>
              )}
              {gameType === 'game' && (
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
              )}
              {!answerVisible && gameType === 'game' && (
                <div className='mt3'>
                  <strong>Options:</strong>
                  {options
                    .sort((a, b) => {
                      if (a.value > b.value) return 1;
                      if (b.value > a.value) return -1;

                      return 0;
                    })
                    .map((opt, index) => {
                      return (
                        <div data-option-index={index} key={index}>
                          <div className='flex'>
                            <div
                              onClick={removeOption}
                              className='f4 fw9 link dim ph2 pv2 mv1 dib white bg-red'>
                              X
                            </div>
                            <div className={'ma2'}>{opt.value}</div>
                            <input
                              className='b mv1 w3 h-10  input-reset ba bg-transparent'
                              type='text'
                              value={opt.odds}
                              onChange={(event) =>
                                setOdds(event.currentTarget.value, opt.value)
                              }
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
              {answerVisible && (
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
          {showEmojiKeyboard && (
            <div className='dt mw9 center pv4 pv5-m '>
              <div className='dtc v-top'>
                <Picker onSelect={emojiSet} />
              </div>
            </div>
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
                  currentGame.gameType !== 'grammy'
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
              <p className='f6 fw6'>{currentGame.details}</p>
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
          {!newGame && (
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
          )}
        </div>
      </section>
      {submissions && (
        <section>
          <div className='dtc f4 b ma0 v-mid w-100 w-90-ns'>
            Total Wagers: {submissions?.length}
          </div>
          <div className='dtc f4 b ma0 v-mid w-100 w-90-ns'>
            Total Pot: {formatPrice(houseBalance)}
          </div>
          <div className='mv3 w-50'>
            <h2>Submissions</h2>
            <table className='f6 w-100 mw8 center' cellSpacing='0'>
              <thead>
                <tr>
                  <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>
                    {' '}
                    Date
                  </th>
                  <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>
                    Name
                  </th>
                  <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>
                    Answer
                  </th>
                  <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>
                    <div>
                      <span>Wager</span>
                    </div>
                  </th>
                  <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>
                    {' '}
                    Result
                  </th>
                </tr>
              </thead>
              <tbody className='lh-copy'>
                {submissions
                  .map((curr, ind) => {
                    return (
                      <tr key={ind}>
                        <td className='pv3 pr3 bb b--black-20' key='date'>
                          {formatDate(new Date(curr.date || '2019-11-30'))}
                        </td>
                        <td className='pv3 pr3 bb b--black-20' key='name'>
                          <a
                            className='no-underline dim black b'
                            href={`/dashboard/manage/${curr.userId}`}>
                            {' '}
                            @{curr.handle}
                          </a>
                        </td>
                        <td className='pv3 pr3 bb b--black-20' key='answer'>
                          {curr.answer} {curr.odds && `(${curr.odds})`}
                        </td>
                        <td
                          className='pv3 pr3 bb b--black-20'
                          key='wager'>{`$${curr.wager}`}</td>
                        <td className='pv3 pr3 bb b--black-20' key='paid'>
                          {typeof curr.won === 'undefined' &&
                            game.gameType === 'game' && (
                              <span className='bg-gold ph1 mt2  mr2 fw8 f5 white'>
                                P
                              </span>
                            )}
                          {typeof curr.won === 'undefined' &&
                            game.gameType === 'fill-in-blank' && (
                              <>
                                <span
                                  onClick={() => winBet(curr)}
                                  className='bg-green dim noselect ph1 mt2 mr2 fw8 f5 white'>
                                  W
                                </span>
                                <span
                                  onClick={() => loseBet(curr)}
                                  className='bg-red dim  noselect ph1 mt2 fw8 f5 white'>
                                  L
                                </span>
                              </>
                            )}
                          {typeof curr.won !== 'undefined' && curr.won && (
                            <span className='bg-green ph1 mt2 fw8 f5 white'>
                              W
                            </span>
                          )}{' '}
                          {typeof curr.won !== 'undefined' && !curr.won && (
                            <span className='bg-red ph1 mt2 fw8 f5 white'>
                              L
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                  .reverse()}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
};

CreateGameForm.defaultProps = {
  isUserSubmission: false,
};

export default CreateGameForm;
