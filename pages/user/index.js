import {
  calculateTotalPayout,
  calculateTotalPayoutWithCredits,
  formatPrice,
  formatPriceWithFractionDigits,
} from '../../lib/helpers';
import { getCookie } from '../../lib/session';
import { instance } from '../../lib/helpers';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import SecuredPage from '../../hoc/securedPage';
import UserDashNavigation from '../../components/layout/UserDashNavigation';
import Wrapper from '../../components/layout/Wrapper';
import absoluteUrl from 'next-absolute-url';
import classNames from 'classnames';

const Terms = ({ balance, submissions, user }) => {
  const data = {
    description: 'Make money while putting your intuition on the line.',
    header: `Welcome, ${user.info.firstName}!`,
  };

  return (
    <Wrapper data={data} user={user}>
      <main>
        <UserDashNavigation balance={balance} user={user} />
        <div className='center ph3 mt1' id='dashboard'>
          <article className='pl3-ns mt2 pt1'>
            <div className='mr5 pr2 pr5-ns'>
              <h2 className='ttu mt0 f6 fw5 silver'>Game History</h2>
            </div>
          </article>
          <section className='flex-m flex-l nl3-m nr3-m nl3-l nr3-l'>
            <section className='ma3 ma4-l  flex flex-wrap '>
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
                    const activeLink = `/games/${game.question.slug}`;
                    const cardClass = `white br2 shadow-4 pa3 pa4-ns h-100  ${game.question.class}`;

                    const gameButtonText =
                      typeof game.won === 'undefined'
                        ? 'Pending'
                        : game.won
                        ? 'Win'
                        : 'Loss';
                    return (
                      <div
                        key={`work-${ind}`}
                        className={`pv2 pa2-ns ${classNames({
                          'w-100-ns': submissions.length === 1,
                          'w-50-ns': submissions.length !== 1,
                        })} w-100`}>
                        <Link href={activeLink}>
                          <a href={activeLink} className='no-underline white'>
                            <div className={cardClass}>
                              <h1 className='f4 mt0 fw7'>
                                <span role='img' aria-label={game.emoji_name}>
                                  {game.emoji}
                                </span>{' '}
                                {`Game #${game.question.question}`}
                              </h1>
                              <p className='mb2'>{game.question.description}</p>
                              <article className='dt w-100 pb1'>
                                <div className='dtc v-mid '>
                                  <h3 className='b mt0 mb1 f5 tl '>
                                    {game.answer}
                                    {game.odds && `(${game.odds})`}
                                  </h3>
                                </div>

                                <div className='dtc v-mid '>
                                  <h3 className='b mt0 mb1 f5 w-100 tr sans-serif'>
                                    {formatPrice(game.wager)} Stake
                                  </h3>
                                </div>
                              </article>

                              {gameButtonText === 'Win' && (
                                <>
                                  <span className='bg-green black pv1 ph2 f7 f6-ns br-pill b'>
                                    Win
                                    <span className='pl1 sans-serif'>
                                      → <span className='f6'>+</span>
                                      {formatPriceWithFractionDigits(
                                        game.usedCredit
                                          ? calculateTotalPayoutWithCredits(
                                              game.odds,
                                              game.wager,
                                            )
                                          : calculateTotalPayout(
                                              game.odds,
                                              game.wager,
                                            ),
                                      )}
                                    </span>
                                  </span>
                                  <span className=' fw5 ml1 tr silver'></span>
                                </>
                              )}
                              {gameButtonText === 'Loss' && (
                                <span className='bg-red black pv1 ph2 f7 f6-ns br-pill b'>
                                  Loss
                                  <span className='pl1 sans-serif'>
                                    → <span className='f6'>-</span>
                                    {formatPrice(game.wager)}
                                  </span>
                                </span>
                              )}
                              {gameButtonText === 'Pending' && (
                                <span className='bg-gold black pv1 ph2 f7 f6-ns br-pill b'>
                                  {gameButtonText}
                                </span>
                              )}
                            </div>
                          </a>
                        </Link>
                      </div>
                    );
                  })
                  .reverse()}
            </section>
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
  const submissionsRes = await instance.get(
    `${apiURL}/api/userSubmissions/${user}`,
  );
  const questionsRes = await instance.get(`${apiURL}/api/questions`);
  const questions = questionsRes.data;
  const userRes = await instance.get(`${apiURL}/api/user/${user}`);
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
