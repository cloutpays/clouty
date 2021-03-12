import classnames from 'classnames';
import 'emoji-mart/css/emoji-mart.css';
import Router from 'next/router';
import React, { useState } from 'react';
import {
  calculateTotalPayout,
  calculateTotalPayoutWithCredits,
  formatDate,
  formatPrice,
  formatPriceWithFractionDigits,
  instance,
} from '../../lib/helpers';
import { GameProps, Submissions } from '../../lib/types';

interface Option {
  value: string;
  odds: string;
}
interface Question {
  gameType: string;
}

interface CreateGameFormProps {
  houseBalance: number;
  options: Option[];
  description: string;
  emoji: string;
  showEmojiKeyboard: boolean;
  gameType: string;
  title: string;
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
}: CreateGameFormProps) => {
  const [description, setDescription] = useState<string>(
    game ? game.description : '',
  );
  const [title, setTitle] = useState<any>(game ? game.title : '');
  const [answer, setAnswer] = useState<any>(game ? game.answer : '');
  const [extendedAnswer, setExtendedAnswer] = useState<any>(
    game ? game.answer : '',
  );
  const [option, setOption] = useState<string>('');
  const [options, setOptions] = useState<any[]>(game ? game.options : []);
  const [details, setDetails] = useState<string>(game ? game.details : '');
  const [gameType, setGameType] = useState<string>(game ? game.gameType : '');
  const [category, setCategory] = useState<string>(game ? game.category : '');
  const [answerVisible, setAnswerVisible] = useState<boolean>(
    game && game.answer ? true : false,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const newGame = game ? false : true;
  const grammy = category === 'grammy';
  const normal = gameType === 'game';
  const fillInBlank = gameType === 'fill-in-blank';
  const number = newGame
    ? (
        questions.filter((curr) => curr.gameType !== 'grammy').length + 4
      ).toString()
    : game.question;

  const slug = !newGame ? game.slug : number;

  const currentGame: GameProps = {
    description,
    options,
    slug,
    title,
    answer,
    extendedAnswer,
    gameType,
    category,
    date: new Date(),
    details,
    userId,
    question: number,
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (isUserSubmission) {
      instance.post('/api/userQuestions', currentGame).then(() => {
        Router.push('/games/create/confirmation');
      });
    } else {
      instance.post('/api/question', currentGame).then(() => {
        Router.push('/dashboard/edit');
      });
    }
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
    instance.delete(`/api/question/${currentGame.slug}`).then(() => {
      Router.push('/dashboard/edit');
    });
  };

  const closeGame = () =>
    instance.post(`/api/endQuestion/${currentGame.slug}`).then(() => {
      Router.push('/dashboard/edit');
    });

  const addAnswer = () => setAnswerVisible(!answerVisible);

  const removeAnswer = () => {
    setAnswer('');
    setAnswerVisible(!answerVisible);
  };

  const winBet = (bet: Submissions) => {
    instance
      .post('/api/winBet', {
        submission: bet,
      })
      .then(() => {
        Router.push('/dashboard/edit');
      });
  };

  const loseBet = (bet: Submissions) => {
    instance
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
          <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
            <legend className='ph0 mh0 fw6 clip'>Sign Up</legend>
            <div className='mt3'>
              <label className='db fw4 mb2 lh-copy f6' htmlFor='email-address'>
                Game Type
              </label>
              <>
                <span
                  className={`b ph2 mr2 pv2 input-reset ba b--black  grow pointer f6 ${classnames(
                    {
                      'bg-transparent': !normal,
                      'bg-black': normal,
                      white: normal,
                    },
                  )}`}
                  onClick={() => setGameType('game')}>
                  Normal
                </span>{' '}
                <span
                  className={`b ph2 mr2 pv2 input-reset ba b--black  grow pointer f6 ${classnames(
                    {
                      'bg-transparent': !fillInBlank,
                      'bg-black': fillInBlank,
                      white: fillInBlank,
                    },
                  )}`}
                  onClick={() => setGameType('fill-in-blank')}>
                  Fill In The Blank
                </span>
              </>
            </div>
            <div className='mt3'>
              <label className='db fw4 mb2 lh-copy f6' htmlFor='email-address'>
                Category
              </label>
              <span
                className={`b ph2 mr2 pv2 input-reset ba b--black  grow pointer f6 ${classnames(
                  {
                    'bg-transparent': !grammy,
                    'bg-black': grammy,
                    white: grammy,
                  },
                )}`}
                onClick={() => setCategory('grammy')}>
                Grammys
              </span>
            </div>
            <div className='mt3'>
              <label className='db fw4 lh-copy f6'>Game Title</label>
              <textarea
                id='comment'
                name='comment'
                className='db h3 border-box hover-black w-100 measure ba b--black pa2 br2 mb2'
                aria-describedby='comment-desc'
                value={title}
                onChange={(event) => setTitle(event.currentTarget.value)}
              />
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
                onChange={(event) => setDescription(event.currentTarget.value)}
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
            {normal && (
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
            {!answerVisible && normal && (
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
          <div className='flex'>
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
        <div className='pv2 pa2-ns w-100 w-100-ns'>
          <a className='no-underline white'>
            <div className={'white br2 shadow-4 pa3 pa4-ns h-100 trillectro'}>
              <h1 className='f4 mt0 fw7'>
                {`${
                  currentGame.gameType !== 'grammy'
                    ? `Game #${currentGame.question}`
                    : currentGame.question
                }`}
              </h1>
              <p>
                {grammy
                  ? description.split('/').map((curr, i) => {
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
          <div className='mv3 w-70'>
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
                          {typeof curr.won === 'undefined' && (
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
                            <>
                              <span className='bg-green ph1 mt2 fw8 f5 white'>
                                W
                              </span>{' '}
                              <span className='pl1 sans-serif'>
                                → <span className='f6'>+</span>
                                {formatPriceWithFractionDigits(
                                  curr.usedCredit
                                    ? calculateTotalPayoutWithCredits(
                                        curr.odds,
                                        curr.wager,
                                      )
                                    : calculateTotalPayout(
                                        curr.odds,
                                        curr.wager,
                                      ),
                                )}
                              </span>
                            </>
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
