import { getCookie } from '../../lib/session';
import PropTypes from 'prop-types';
import React from 'react';
import SecuredPage from '../../hoc/securedPage';
import UserDashNavigation from '../../components/UserDashNavigation';
import Wrapper from '../../components/Wrapper';
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
                      <h4 className='mv0'>Submissions</h4>
                    </div>
                    <ul className='list pl0 mt0 measure center'>
                      <main className=' center'>
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
                                  <a
                                    className='link dt w-100 bb b--black-10 pa3 dim blue'
                                    href={`/games/${game.question.question}`}>
                                    <div className='dtc v-top' key={ind}>
                                      <h1 className='f6 f5-ns fw6 lh-title black mv0'>
                                        {`${
                                          game.question.gameType === 'game'
                                            ? `${game.question.description}`
                                            : game.question.description
                                        }`}
                                      </h1>
                                      <div className='f5 fw4 pt1 black-60'>
                                        {`Your Bet: ${game.answer}`}{' '}
                                      </div>
                                      {gameButtonText === 'W' && (
                                        <div>
                                          <span className='bg-green ph1 mt2 fw8 f5 white'>
                                            W
                                          </span>
                                          <span className='f5 fw5 ml1 silver'>
                                            +${game.wager * 2}
                                          </span>
                                        </div>
                                      )}
                                      {gameButtonText === 'L' && (
                                        <>
                                          <span className='bg-red ph1 mt2 fw8 f5 white'>
                                            L
                                          </span>
                                          <span className='f5 fw5 ml1 silver'>
                                            -${game.wager}
                                          </span>
                                        </>
                                      )}
                                      {gameButtonText === 'P' && (
                                        <>
                                          <span className='bg-gold ph1 mt2 fw8 f5 white'>
                                            P
                                          </span>
                                          <span className='f5 fw5 ml1 silver'>
                                            ${game.wager}
                                          </span>
                                        </>
                                      )}
                                    </div>
                                  </a>
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
