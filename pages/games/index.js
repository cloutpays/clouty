import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';

import Wrapper from '../../components/Wrapper';
import games from '../../lib/games';
const Games = () => {
  const data = {
    title: 'Games',
    header: 'Selected games and contests.',
    description: 'Selected games and contests.',
  };

  return (
    <Wrapper data={data}>
      <section className='flex flex-wrap'>
        {games.map((game) => {
          return (
            <div key={`work-${game.name}`} className='pv2 pa2-ns w-100 w-50-ns'>
              <Link href={`/games/${game.slug}`}>
                <a href={`/games/${game.slug}`} className='no-underline white'>
                  <div
                    className={`white br2 shadow-4 grow pa3 pa4-ns h-100 ${game.class}`}>
                    <h1 className='f4 mt0 fw7'>
                      <span role='img' aria-label={game.emoji_name}>
                        {game.emoji}
                      </span>{' '}
                      {game.title}
                    </h1>
                    <p>{game.description}</p>
                    <span className='bg-white-30 pv1 ph2 f7 f6-ns br-pill b'>
                      Play Game
                      <span className='pl1 sans-serif'>→</span>
                    </span>
                  </div>
                </a>
              </Link>
            </div>
          );
        })}

        <div key='contact' className='pv2 pa2-ns w-100 w-50-ns'>
          <a href='mailto:umeh@clouty.io' className='no-underline'>
            <div className='white br2 shadow-4 grow pa3 pa4-ns h-100 contact-card'>
              <h1 className='f4 mt0 fw7'>
                <span role='img' aria-label='User Submission'>
                  🗳
                </span>{' '}
                Want to submit a bet?
              </h1>
              <p>If it&apos;s good, we will add it to our weekly games.</p>
              <p>Sound good?</p>
              <span className='bg-white-30 pv1 ph2 f7 f6-ns br-pill b'>
                Get in touch<span className='pl1 sans-serif'>→</span>
              </span>
            </div>
          </a>
        </div>
      </section>
    </Wrapper>
  );
};

Games.propTypes = {
  games: PropTypes.array,
};

export default Games;
