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
                <h2 className='ttu mb2 f6 fw5 silver'>Submissions</h2>
                {submissions.length > 0 ? (
                  submissions
                    .map((game) => {
                      const gameButtonText = !game.question.answer
                        ? 'Pending'
                        : game.question.answer === game.answer
                        ? 'Won'
                        : 'Lost';
                      const activeLink = `/games/${game.question.slug}`;
                      const cardClass = `white br2 shadow-4 pa3 pa4-ns h-100 grow grammy`;
                      return (
                        <div
                          key={`work-${game.question.slug}`}
                          className='pv2 pa2-ns w-100 w-100-ns'>
                          <Link href={activeLink}>
                            <a href={activeLink} className='no-underline white'>
                              <div className={cardClass}>
                                <h1 className='f4 mt0 fw7'>
                                  <span
                                    role='img'
                                    aria-label={game.question.emoji_name}>
                                    {game.question.emoji}
                                  </span>{' '}
                                  {`${
                                    game.question.gameType === 'game'
                                      ? `Game #${game.question.question}`
                                      : game.question.question
                                  }`}{' '}
                                </h1>
                                {/* {grammy
                                  ? grammyRender(game.question)
                                  : game.question.description} */}

                                <p>{`Wager: $${game.wager}`}</p>
                                <p>{`Submission: ${game.answer}`}</p>
                                <span className='bg-white-30 pv1 ph2 f7 f6-ns br-pill b'>
                                  {gameButtonText}
                                  <span className='pl1 sans-serif'>→</span>
                                </span>
                              </div>
                            </a>
                          </Link>
                        </div>
                      );
                    })
                    .reverse()
                ) : (
                  <div className='divide tc relative'>
                    <h5 className='fw4 ttu mv0 dib bg-white ph3'>
                      NO GAMES YET
                    </h5>
                    <br />
                    <a
                      href='/games'
                      className=' f6 no-underline fw5 mt3 br2 ph3 pv2 dib ba b--blue blue bg-white hover-bg-blue hover-white'>
                      Start a Game
                    </a>
                  </div>
                )}
              </div>
              <hr className='o-20 mt4' />
              <div className='flex flex-wrap pt3 nl3 nr3'>
                <div className='w-100 w-50-l ph3 mb3 mb0-l'>
                  <div className='bt bl br b--black-10 br2'>
                    <div className='pa3 bb b--black-10'>
                      <h4 className='mv0'>Countries</h4>
                    </div>
                  </div>
                  <a
                    href='#'
                    className='no-underline fw5 mt3 br2 ph3 pv2 dib ba b--blue blue bg-white hover-bg-blue hover-white'>
                    All Countries
                  </a>
                </div>
                <div className='w-100 w-50-l ph3 mb3 mb0-l'>
                  <div className='bt bl br b--black-10 br2'>
                    <div className='pa3 bb b--black-10'>
                      <h4 className='mv0'>Most Visited Pages</h4>
                    </div>
                  </div>
                  <a
                    href='#'
                    className='no-underline fw5 mt3 br2 ph3 pv2 dib ba b--blue blue bg-white hover-bg-blue hover-white'>
                    All Pages
                  </a>
                </div>
              </div>
              <div className='mt4'>
                <div className='w-100 mb3 mb0-l'>
                  <div className='bt bl br b--black-10 br2'>
                    <div className='pa3 bb b--black-10'>
                      <h4 className='mv0'>Devices and Resolutions</h4>
                    </div>
                  </div>
                  <a
                    href='#'
                    className='no-underline fw5 mt3 br2 ph3 pv2 dib ba b--blue blue bg-white hover-bg-blue hover-white'>
                    All Devices
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
