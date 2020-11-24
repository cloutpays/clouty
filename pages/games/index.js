import { sortGames } from '../../lib/helpers';
import PropTypes from 'prop-types';
import React from 'react';
import Wrapper from '../../components/layout/Wrapper';
import absoluteUrl from 'next-absolute-url';
import axios from 'axios';

const Games = ({ questions }) => {
  const data = {
    title: 'Games',
    header: 'Selected games and contests.',
    description: 'Selected games and contests.',
  };
  return (
    <Wrapper data={data}>
      <section>
        <div className='row'>
          <div className='col-md-4 p-0'>
            <img
              src='/static/img/new/album-cover.jpg'
              width='100%'
              height='300'
            />
          </div>
          <div className='col-md-8 p-0'>
            <div className='album-cover'>
              <p>This Week’s Featured Bet</p>
              <h3>#Verzuz to return with Gucci Mane vs. Jeezy</h3>
              <button className='btn btn-default bet-now mr-3'>Bet Now</button>
              <button className='btn btn-default all-bet'>View All Bets</button>
            </div>
          </div>
        </div>
      </section>
      <section className='game-section'>
        <div className='container'>
          <div className='game-container'>
            <div className='row'>
              <div className='col-md-12 text-center'>
                <p className='text-dark'>Our Active Bets</p>
              </div>
              {/* <div className='col-md-6'>
                <div className='card'>
                  <div className='card-body'>
                    <p className='game-id'>Game #44</p>
                    <h2 className='game-title'>
                      #Verzuz to Return With Gucci Mane vs. Jeezy
                    </h2>
                    <p className='game-des'>
                      Wager on who you think the winner will be when Jeezy and
                      Gucci Mane pit their catalogs of hits head-to-head.
                    </p>
                    <button type='submit' className='btn btn-outline-default'>
                      Place Your Bet
                    </button>
                  </div>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='card'>
                  <div className='card-body'>
                    <p className='game-id'>Game #44</p>
                    <h2 className='game-title'>
                      #Verzuz to Return With Gucci Mane vs. Jeezy
                    </h2>
                    <p className='game-des'>
                      Wager on who you think the winner will be when Jeezy and
                      Gucci Mane pit their catalogs of hits head-to-head.
                    </p>
                    <button type='submit' className='btn btn-outline-default'>
                      Place Your Bet
                    </button>
                  </div>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='card'>
                  <div className='card-body'>
                    <p className='game-id'>Game #44</p>
                    <h2 className='game-title'>
                      #Verzuz to Return With Gucci Mane vs. Jeezy
                    </h2>
                    <p className='game-des'>
                      Wager on who you think the winner will be when Jeezy and
                      Gucci Mane pit their catalogs of hits head-to-head.
                    </p>
                    <button type='submit' className='btn btn-outline-default'>
                      Place Your Bet
                    </button>
                  </div>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='card'>
                  <div className='card-body'>
                    <p className='game-id'>Game #44</p>
                    <h2 className='game-title'>
                      #Verzuz to Return With Gucci Mane vs. Jeezy
                    </h2>
                    <p className='game-des'>
                      Wager on who you think the winner will be when Jeezy and
                      Gucci Mane pit their catalogs of hits head-to-head.
                    </p>
                    <button type='submit' className='btn btn-outline-default'>
                      Place Your Bet
                    </button>
                  </div>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='card'>
                  <div className='card-body'>
                    <p className='game-id'>Game #44</p>
                    <h2 className='game-title'>
                      #Verzuz to Return With Gucci Mane vs. Jeezy
                    </h2>
                    <p className='game-des'>
                      Wager on who you think the winner will be when Jeezy and
                      Gucci Mane pit their catalogs of hits head-to-head.
                    </p>
                    <button type='submit' className='btn btn-outline-default'>
                      Place Your Bet
                    </button>
                  </div>
                </div>
              </div>
             */}
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
                    <a key={activeLink} href={activeLink}>
                      <div className='col-md-6'>
                        <div className='card'>
                          <div className='card-body'>
                            <p className='game-id'>{`Game #${game.question}`}</p>
                            <h2 className='game-title'>{game.title}</h2>
                            <p className='game-des'>{game.description}</p>
                            <p className='game-des'>{game.details}</p>
                            <button
                              type='submit'
                              className='btn btn-outline-default'>
                              {gameButtonText}
                            </button>
                          </div>
                        </div>
                      </div>
                    </a>
                  );
                })
                .reverse()}
              <div className='col-md-6'>
                <div className='card bet-mind-card'>
                  <div className='card-body text-center'>
                    <h1>Have a bet in mind?</h1>
                    <div>
                      <small>
                        You’re just minutes away from placing your first ever
                        music bet.
                        <br />
                        We’ll even give you $2 free when you sign up!
                      </small>
                    </div>
                    <button className='btn btn-default'>Sign Up</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='ma3 ma4-l flex flex-wrap'>
        {/* <div key='createGame' className='pv2 pa2-ns w-100 w-50-ns'>
          <Link href='/games/create'>
            <a className='no-underline'>
              <div className='white br2 shadow-4 grow pa3 pa4-ns h-100 contact-card'>
                <h1 className='f4 mt0 fw7'>
                  <span role='img' aria-label='User Submission'>
                    🗳
                  </span>{' '}
                  Want to create a game?
                </h1>
                <p>If it&apos;s good, we will add it to our weekly games.</p>
                <p>Sound good?</p>
                <span className='bg-white-30 pv1 ph2 f7 f6-ns br-pill b'>
                  Create Game<span className='pl1 sans-serif'>→</span>
                </span>
              </div>
            </a>
          </Link>
        </div> */}
      </section>
    </Wrapper>
  );
};

Games.getInitialProps = async ({ req }) => {
  const { origin } = absoluteUrl(req);
  const apiURL = `${origin}`;
  const res = await axios.get(`${apiURL}/api/questions`);
  const questions = res.data;
  return {
    questions: questions.filter(
      (game) => game.gameType === 'game' || game.gameType === 'fill-in-blank',
    ),
  };
};
Games.propTypes = {
  questions: PropTypes.array,
};

export default Games;
