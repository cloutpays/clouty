import { sortGames } from '../../lib/helpers';
import PropTypes from 'prop-types';
import React from 'react';
import Wrapper from '../../components/layout/Wrapper';
import absoluteUrl from 'next-absolute-url';
import axios from 'axios';
const contentful = require('contentful');

const Games = ({ questions, latestPost }) => {
  const data = {
    title: 'Games',
    header: 'Selected games and contests.',
    description: 'Selected games and contests.',
  };
  return (
    <Wrapper data={data}>
      <section>
        <div className='row'>
          <div className='col-md-4 p-md-0 album-over-order-sm-2'>
            <img className='album-cover-image' src={`http:${latestPost.url}`} />
            <div className='bet-button-group-mobile'>
              <a href='/games'>
                <button className='btn btn-default bet-now mr-3 border-0'>
                  Bet Now
                </button>
              </a>
              <button className='btn btn-default read-more'>Read More</button>
            </div>
          </div>
          <div className='col-md-8 p-md-0 album-over-order-sm-1'>
            <div className='album-cover'>
              <div className='album-cover-content'>
                <p>This Week&apos;s Featured Bet</p>
                <h3>{latestPost.description}</h3>
                <div className='bet-button-group'>
                  <button className='btn btn-default bet-now mr-3'>
                    Bet Now
                  </button>
                  <button className='btn btn-default all-bet'>
                    View All Bets
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='game-section'>
        <div className='container'>
          <div className='game-container'>
            <div className='row'>
              <div className='col-md-12 text-center'>
                <p className='game-list-main-title'>Our Active Bets</p>
              </div>
              <div className='masonry'>
                {questions
                  .sort(sortGames)
                  .filter((curr, ind) => ind !== 13)
                  .map((game) => {
                    const gameClosed = new Date(game.endDate) < new Date();
                    const gameButtonText = !game.answer
                      ? gameClosed
                        ? 'Game Ended'
                        : 'Place Your Bet'
                      : 'See Results';
                    const activeLink = `/games/${game.slug}`;
                    return (
                      <div key={activeLink} className='item'>
                        <div className='item-shadow'>
                          <div className='card'>
                            <div className='card-body'>
                              <p className='game-id'>{`Game #${game.question}`}</p>
                              <h2 className='game-title'>{game.title}</h2>
                              <p className='game-des'>{game.description}</p>
                              <p className='game-des'>{game.details}</p>
                              <a href={activeLink}>
                                <button
                                  type='submit'
                                  className='btn btn-outline-default'>
                                  {gameButtonText}
                                </button>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                  .reverse()}
                <div className='item'>
                  <div className='item-shadow'>
                    <div className='card bet-mind-card'>
                      <div className='card-body text-center'>
                        <h1>Have a bet in mind?</h1>
                        <div>
                          <p className='game-des'>
                            If your bet idea makes the cut, we&apos;ll offer it
                            and reward you with a $10 credit towards betting!
                          </p>
                        </div>
                        <button className='btn btn-default border-0'>
                          Submit Bet
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

Games.getInitialProps = async ({ req }) => {
  const { origin } = absoluteUrl(req);
  const apiURL = `${origin}`;
  const res = await axios.get(`${apiURL}/api/questions`);
  const questions = res.data;
  const client = contentful.createClient({
    space: '74q51vemgz9l',
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });
  let latestPost = await client
    .getEntries()
    .then((entry) => {
      const { items } = entry;
      const {
        fields: {
          file: { url },
        },
      } = items[0].fields.image;
      const description = items[0].fields.description;

      return { url, description };
    })
    .catch((err) => console.log(err));

  return {
    latestPost,
    questions: questions.filter(
      (game) => game.gameType === 'game' || game.gameType === 'fill-in-blank',
    ),
  };
};
Games.propTypes = {
  questions: PropTypes.array,
  latestPost: PropTypes.object,
};

export default Games;
