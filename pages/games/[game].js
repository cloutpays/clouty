import { formatPrice, grammyRender } from '../../lib/helpers';
import { getCookie } from '../../lib/session';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import SecuredPage from '../../hoc/securedPage';
import SignUpForm from '../../components/gameplay/SignUpForm';
import Wrapper from '../../components/layout/Wrapper';
import absoluteUrl from 'next-absolute-url';
import axios from 'axios';

const Games = ({ game, user, submissions, houseBalance, isAdmin }) => {
  const title =
    game.gameType === 'grammy' ? game.question : `Game #${game.question}`;
  const data = {
    title,
    header: `${game.emoji} ${title}`,
    description: 'Selected games and contests.',
  };
  const gameClosed = new Date(game.endDate) < new Date();

  const description =
    game.gameType === 'grammy' ? grammyRender(game) : game.description;
  return (
    <Wrapper data={data}>
      <section className='flex flex-wrap'>
        <div className='dtc f6 b ma0 v-mid w-100 w-90-ns tr'>
          Current Balance:{' '}
          {formatPrice(
            (user.stripe.user.balance + user.stripe.user.credit) / 100,
          )}
        </div>
        <div className='dtc f6 b ma0 v-mid w-100 w-90-ns tr'>
          <div className='noselect grow outline dim pv2 ph3 mr2 fr mt2'>
            <Link href='/user/balance'>
              <strong>ADD TO BALANCE</strong>
            </Link>
          </div>
        </div>
        <div
          key={`work-${game.name}`}
          className='pv2 pa2-ns w-100 center w-80-ns'>
          <a className='no-underline white'>
            <div
              className={`white br2 shadow-4 pa3 pa4-ns h-100 ${game.class}`}>
              <p>{description}</p>
              {!game.answer && !gameClosed && (
                <SignUpForm user={user} game={game} />
              )}
              {gameClosed && (
                <div className='f5 mt4 fw7'>
                  Game is now closed. Winning bet will be announced shortly 🥳
                </div>
              )}
              {game.answer && (
                <>
                  <div className='f5 mt0 fw7'>Winning bet:</div>{' '}
                  <div className='f4 mt0 fw7'>{game.answer}</div>
                </>
              )}
            </div>
          </a>
        </div>
        {isAdmin && (
          <>
            <div className='dtc f4 b ma0 v-mid w-100 w-90-ns tr'>
              Total Wagers: {submissions.length}
            </div>
            <div className='dtc f4 b ma0 v-mid w-100 w-90-ns tr'>
              Total Pot: {formatPrice(houseBalance)}
            </div>
          </>
        )}
      </section>
    </Wrapper>
  );
};

Games.getInitialProps = async (ctx) => {
  const { query, req } = ctx;
  const { game } = query;
  const { origin } = absoluteUrl(req);
  const apiURL = `${origin}`;
  const question = (await axios.get(`${apiURL}/api/question/${game}`)).data;
  const user = getCookie('id_token', ctx.req);
  const isAdmin = getCookie('id_token_admin', ctx.req) ? true : false;
  const userRes = await axios.get(`${apiURL}/api/user/${user}`);
  const submissionsRes = await axios.get(`${apiURL}/api/submissions`);
  const submissions = submissionsRes.data.filter(
    (curr) => curr.question === game,
  );
  const houseBalance = submissions.reduce((acc, curr) => {
    return acc + curr.wager;
  }, 0);
  const userObj = userRes.data;
  return {
    game: question[0],
    user: userObj,
    submissions,
    houseBalance,
    isAdmin,
  };
};

Games.propTypes = {
  games: PropTypes.array,
  game: PropTypes.object,
  user: PropTypes.object,
  submissions: PropTypes.array,
  houseBalance: PropTypes.number,
  isAdmin: PropTypes.boolean,
};

export default SecuredPage(Games);
