import { getCookie } from '../../lib/session';
import { grammyRender } from '../../lib/helpers';
import PropTypes from 'prop-types';
import React from 'react';
import SignUpForm from '../../components/SignUpForm';
import Wrapper from '../../components/Wrapper';
import absoluteUrl from 'next-absolute-url';
import axios from 'axios';

const Games = ({ game, userId }) => {
  const title =
    game.gameType === 'grammy' ? game.question : `Game #${game.question}`;
  const data = {
    title,
    header: 'Play',
    description: 'Selected games and contests.',
  };
  const description =
    game.gameType === 'grammy' ? grammyRender(game) : game.description;
  return (
    <Wrapper data={data}>
      <section className='flex flex-wrap'>
        <div key={`work-${game.name}`} className='pv2 pa2-ns w-100 w-100-ns'>
          <a className='no-underline white'>
            <div
              className={`white br2 shadow-4 pa3 pa4-ns h-100 ${game.class}`}>
              <h1 className='f4 mt0 fw7'>
                <span role='img' aria-label={game.emoji_name}>
                  {game.emoji}
                </span>
                {title}
              </h1>
              <p>{description}</p>
              {!game.answer && <SignUpForm userId={userId} game={game} />}
              {game.answer && (
                <>
                  <div className='f5 mt0 fw7'>Winning bet:</div>{' '}
                  <div className='f4 mt0 fw7'>{game.answer}</div>
                </>
              )}
            </div>
          </a>
        </div>
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
  const userId = getCookie('id_token', ctx.req);
  return { game: question[0], userId };
};

Games.propTypes = {
  games: PropTypes.array,
  game: PropTypes.object,
  userId: PropTypes.string,
};

export default Games;
