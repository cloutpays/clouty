import { grammyRender, instance, sortGames } from '../../../lib/helpers';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import Wrapper from '../../../components/layout/Wrapper';
import absoluteUrl from 'next-absolute-url';
import adminPage from '../../../hoc/adminPage';
const Games = ({ questions }) => {
  const data = {
    title: 'Edit',
    header: 'Manage games and contests.',
    description: 'Manage games and contests.',
  };
  return (
    <Wrapper data={data}>
      <section className='ma3 ma4-l flex flex-wrap'>
        {questions.length > 0
          ? questions
              .sort(sortGames)
              .map((game) => {
                const gameButtonText = 'Manage';
                const grammy = game.gameType === 'grammy';
                const gameClosed = new Date(game.endDate) < new Date();

                const activeLink = `/dashboard/edit/${game.slug}`;
                const cardClass = `white br2 shadow-4 pa3 pa4-ns h-100 grow ${game.class}`;
                return (
                  <div
                    key={`work-${game.slug}`}
                    className='pv2 pa2-ns w-100 w-50-ns'>
                    <Link href={activeLink}>
                      <a href={activeLink} className='no-underline white'>
                        <div className={cardClass}>
                          <h1 className='f4 mt0 fw7'>
                            <span role='img' aria-label={game.emoji_name}>
                              {game.emoji}
                            </span>{' '}
                            {`${
                              game.gameType === 'game' ||
                              game.gameType === 'fill-in-blank'
                                ? `Game #${game.question}`
                                : game.question
                            }`}
                          </h1>
                          <p>
                            {grammy ? grammyRender(game) : game.description}
                          </p>
                          {!game.answer && gameClosed && (
                            <>
                              <div className='f6 mt0 fw7'>Game Closed</div>{' '}
                            </>
                          )}
                          {game.answer && (
                            <>
                              <div className='f6 mt0 fw7'>Winning bet:</div>{' '}
                              <div className='f5 mb2 mt0 fw7'>
                                {game.answer}
                              </div>
                            </>
                          )}
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
          : 'No games to edit man :('}
      </section>
    </Wrapper>
  );
};

Games.getInitialProps = async ({ req }) => {
  const { origin } = absoluteUrl(req);
  const apiURL = `${origin}`;
  const res = await instance.get(`${apiURL}/api/questions`);
  const questions = res.data;
  return { questions };
};
Games.propTypes = {
  questions: PropTypes.array,
};

export default adminPage(Games);
