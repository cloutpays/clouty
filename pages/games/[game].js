import PropTypes from 'prop-types';
import React from 'react';
import SignUpForm from '../../components/SignUpForm';
import Wrapper from '../../components/Wrapper';
import games from '../../lib/games';

const Games = ({ game: gameSlug }) => {
  const data = {
    title: 'Games',
    header: 'Play',
    description: 'Selected games and contests.',
  };

  const game = games.find((game) => game.slug === gameSlug);

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
                {game.title}
              </h1>
              <p>{game.description}</p>
              <SignUpForm gameID={game.slug} />

              <br />
              <br />
            </div>
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
