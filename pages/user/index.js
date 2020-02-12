import { getCookie } from '../../lib/session';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import SecuredPage from '../../hoc/securedPage';
import UserDashNavigation from '../../components/UserDashNavigation';
import Wrapper from '../../components/Wrapper';
import absoluteUrl from 'next-absolute-url';
import axios from 'axios';

const Terms = ({ submissions, user }) => {
  const data = {
    description: 'Make money while putting your intuition on the line.',
    header: `Welcome, ${user.info.firstName}!`,
  };
  return (
    <Wrapper data={data} className='measure-wide'>
      <main>
        <UserDashNavigation user={user} />
        <div className='mw8 center ph3' id='dashboard'>
          <section className='flex-m flex-l nl3-m nr3-m nl3-l nr3-l'>
            <article className='w-100 w-75-m w-75-l ph3-m ph3-l'>
              <div className='flex-m flex-l flex-wrap items-center justify-between nl3 nr3 pt1 mb4'>
                <div className='w-100 w-50-l ph3 mb3 mb0-l'>
                  <div className='bt bl br b--black-10 br2'>
                    <div className='pa3 bb b--black-10'>
                      <h4 className='mv0'>Submissions</h4>
                    </div>
                    <ul className='list pl0 mt0 measure center'>
                      {submissions.length > 0 &&
                        submissions
                          .map((game) => {
                            const gameButtonText = !game.question.answer
                              ? 'Pending'
                              : game.question.answer === game.answer
                              ? 'W'
                              : 'L';
                            const activeLink = `/games/${game.question.slug}`;
                            return (
                              <Link key={activeLink} href={activeLink}>
                                <li className='flex  items-center lh-copy pa3 ph0-l bb b--black-10'>
                                  <span
                                    className='w2 h2 w3-ns  br-100'
                                    role='img'
                                    aria-label={game.question.emoji_name}>
                                    {game.question.emoji}
                                  </span>
                                  <div className='pl3 flex-auto'>
                                    <span className='f6 db black-70'>
                                      {`${
                                        game.question.gameType === 'game'
                                          ? `Game #${game.question.question}`
                                          : game.question.question
                                      }`}
                                    </span>
                                    <span className='f6 db black-70'>
                                      {`Bet: ${game.answer}`}{' '}
                                    </span>
                                  </div>
                                  <div className='flex flex-wrap'>
                                    {gameButtonText === 'W' && (
                                      <>
                                        <div className='bg-green ph1 fw8 f6 white'>
                                          W
                                        </div>
                                        <div className='f5 fw5 ml1 silver'>
                                          +${game.wager * 2}
                                        </div>
                                      </>
                                    )}
                                    {gameButtonText === 'L' && (
                                      <>
                                        <div className='bg-red ph1 fw8 f6 white'>
                                          L
                                        </div>
                                        <div className='f5 fw5 ml1 silver'>
                                          -${game.wager}
                                        </div>
                                      </>
                                    )}
                                    {gameButtonText === 'Pending' && (
                                      <>
                                        <div className='bg-gold ph1 fw8 f6 white'>
                                          P
                                        </div>
                                        <div className='f5 fw5 ml1 silver'>
                                          ${game.wager}
                                        </div>
                                      </>
                                    )}
                                    {/* <div className='f6'>+$5</div> */}
                                  </div>
                                </li>
                              </Link>
                            );
                          })
                          .reverse()}
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

  return { submissions, questions, user: userObj };
};

Terms.propTypes = {
  submissions: PropTypes.array,
  questions: PropTypes.array,
  user: PropTypes.object,
};
export default SecuredPage(Terms);
