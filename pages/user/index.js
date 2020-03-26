import { formatDate, formatPrice } from '../../lib/helpers';
import { getCookie } from '../../lib/session';
import PropTypes from 'prop-types';
import React from 'react';
import SecuredPage from '../../hoc/securedPage';
import UserDashNavigation from '../../components/layout/UserDashNavigation';
import Wrapper from '../../components/layout/Wrapper';
import absoluteUrl from 'next-absolute-url';
import axios from 'axios';

const Terms = ({ balance, submissions, user }) => {
  const data = {
    description: 'Make money while putting your intuition on the line.',
    header: `Welcome, ${user.info.firstName}!`,
  };
  return (
    <Wrapper data={data} user={user} className='measure-wide'>
      <main>
        <UserDashNavigation balance={balance} user={user} />
        <div className='mw8 center ph3' id='dashboard'>
          <section className='flex-m flex-l nl3-m nr3-m nl3-l nr3-l'>
            <article className='w-100 w-75-m  ph3-m ph3-l'>
              <div className='flex-m flex-l flex-wrap items-center justify-between nl3 nr3 pt1 mb4'>
                <div className='w-100 ph1 mb3 mb0-l'>
                  <div className='bt bl br b--black-10 br2'>
                    <div className='pa3 bb b--black-10'>
                      <h4 className='mv0'>Submitted Bets</h4>
                    </div>
                    <ul className='  list pl0 mt0  center'>
                      <main className=' center'>
                        {submissions.length === 0 && (
                          <article>
                            <div className='link dt w-100 pa3 dim blue'>
                              <div className='dtc v-top' key='no'>
                                <h1 className='f6 f5-ns fw6 lh-title black mv0 pa4 center '>
                                  No Games Yet 🕹{' '}
                                </h1>
                              </div>
                            </div>
                          </article>
                        )}
                        {submissions.length > 0 &&
                          submissions
                            .map((game, ind) => {
                              const gameButtonText =
                                typeof game.won === 'undefined'
                                  ? 'P'
                                  : game.won
                                  ? 'W'
                                  : 'L';
                              return (
                                <article key={ind}>
                                  <div className='pl3 pt3 dtc v-mid'>
                                    <span
                                      role='img'
                                      className='f2'
                                      aria-label={game.question.emoji}>
                                      {game.question.emoji}
                                    </span>
                                  </div>
                                  <div className='dtc v-mid pt2 pl2'>
                                    <h1 className='f5 f4-ns fw6 lh-title black mv0'>
                                      {`${game.question.gameType === 'game' &&
                                        ` Game #${game.question.question}`}`}
                                    </h1>
                                    <h2 className='f5 fw4 mt0 mb0 black-80'>
                                      Bet: {game.answer} ~ Stake{' '}
                                      {formatPrice(game.wager)}
                                    </h2>
                                  </div>
                                  <div
                                    className='link dt w-100 bb b--black-10 pl3 pb2 dim blue'
                                    href={`/games/${game.question.question}`}>
                                    <div className='dtc v-top pt1' key={ind}>
                                      <span className='f5  f4-ns fw5  tl silver'>
                                        {`${formatDate(new Date(game.date))}`}
                                      </span>
                                    </div>
                                    <div className='dtc v-top' key={ind}>
                                      <span className='pt2 tr f4'>
                                        {gameButtonText === 'W' && (
                                          <>
                                            <span className='bg-green tr ph1 mt2 fw8 f5 white'>
                                              W
                                            </span>
                                            <span className=' fw5 ml1 tr silver'>
                                              +$
                                              {game.usedCredit
                                                ? game.wager
                                                : game.wager * 2}
                                            </span>
                                          </>
                                        )}
                                        {gameButtonText === 'L' && (
                                          <>
                                            <span className='bg-red ph1 mt2 fw8 white'>
                                              L
                                            </span>
                                            <span className=' fw5 ml1 silver'>
                                              -${game.wager}
                                            </span>
                                          </>
                                        )}
                                        {gameButtonText === 'P' && (
                                          <>
                                            <span className='bg-gold tr ph1 mt2 fw8 white'>
                                              P
                                            </span>
                                            <span className=' fw5 ml1 silver'>
                                              ${game.wager}
                                            </span>
                                          </>
                                        )}
                                      </span>
                                    </div>
                                  </div>
                                </article>
                              );
                            })
                            .reverse()}
                      </main>
                    </ul>
                  </div>
                  <a
                    href='/games'
                    className='no-underline fw5 mt3 br2 ph3 pv2 dib ba b--blue blue bg-white hover-bg-blue hover-white'>
                    Play A Game
                  </a>
                </div>
              </div>
            </article>
          </section>
        </div>
      </main>
    </Wrapper>
  );
};
Terms.getInitialProps = async (ctx) => {
  const { origin } = absoluteUrl(ctx.req);
  const apiURL = `${origin}`;

  const user = getCookie('id_token', ctx.req);
  const submissionsRes = await axios.get(
    `${apiURL}/api/userSubmissions/${user}`,
  );
  const questionsRes = await axios.get(`${apiURL}/api/questions`);
  const questions = questionsRes.data;
  const userRes = await axios.get(`${apiURL}/api/user/${user}`);
  const userObj = userRes.data;
  const submissions = submissionsRes.data.map((sub) => {
    return {
      ...sub,
      question: questions.filter((question) => {
        return sub.question === question.question;
      })[0],
    };
  });
  return {
    balance: userObj?.stripe?.user?.balance ?? 0,
    submissions,
    user: userObj,
  };
};

Terms.propTypes = {
  balance: PropTypes.number,
  submissions: PropTypes.array,
  user: PropTypes.object,
};
export default SecuredPage(Terms);
