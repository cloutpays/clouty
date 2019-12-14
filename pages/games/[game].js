import PropTypes from 'prop-types';
import React from 'react';
import Wrapper from '../../components/Wrapper';
import games from '../../lib/games';
const Games = ({ game: gameSlug }) => {
  const data = {
    title: 'Games',
    header: 'Play',
    description: 'Selected games and contests.',
  };

  const gameIndex = games.findIndex((item) => item.slug === gameSlug);
  const game = games[gameIndex];

  return (
    <Wrapper data={data}>
      <section className='flex flex-wrap'>
        <div key={`work-${game.name}`} className='pv2 pa2-ns w-100 w-50-ns'>
          <a className='no-underline white'>
            <div
              className={`white br2 shadow-4 pa3 pa4-ns h-100 ${game.class}`}>
              <h1 className='f4 mt0 fw7'>
                <span role='img' aria-label={game.emoji_name}>
                  {game.emoji}
                </span>{' '}
                {game.title}
              </h1>
              <p>{game.description}</p>

              <input type='name' placeholder='Name' />
              <input type='email' placeholder='Email Address' />

              <br />
              <br />
              <span className='bg-white-30 pv1 ph2 f7 f6-ns br-pill b'>
                <span className='pl1 sans-serif'>Submit </span>
              </span>
            </div>
          </a>
        </div>
        <div key='contact' className='pv2 pa2-ns w-100 w-50-ns'>
          <a href='mailto:hello@laurendorman.io' className='no-underline'>
            {/* <div className='white br2 shadow-4 pa3 pa4-ns h-100 contact-card'> */}
            <h1 className='f4 mt0 fw7'>
              <span role='img' aria-label='User Submission'>
                🗳
              </span>{' '}
              Want to submit a bet?
            </h1>
            <p>If it&apos;s good, we will add it to our weekly games.</p>
            <p>Sound good?</p>
            <input type='name' placeholder='Name' />
            <input type='email' placeholder='Email Address' />

            <br />
            <br />
            <span className='bg-white-30 pv1 ph2 f7 f6-ns br-pill b'>
              Get in touch<span className='pl1 sans-serif'>→</span>
            </span>
            {/* </div> */}
          </a>
        </div>
      </section>
    </Wrapper>
  );
};

Games.getInitialProps = async (context) => {
  const { game } = context.query;
  return { game };
};

Games.propTypes = {
  games: PropTypes.array,
  game: PropTypes.string,
};

export default Games;
