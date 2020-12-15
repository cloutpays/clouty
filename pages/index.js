import { getCookie } from '../lib/session';
import { styles } from '../constants/styles';
import DemoForm from '../components/gameplay/DemoForm';
import DisclaimerModal from '../components/DisclaimerModal';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import Wrapper from '../components/layout/Wrapper';
import absoluteUrl from 'next-absolute-url';
import axios from 'axios';
import classnames from 'classnames';
const data = {
  description: 'Make money while putting your intuition on the line.',
  header: `Welcome to Clouty`,
};

const Home = ({ questions, darkMode, loggedIn, album }) => {
  return (
    <div>
      <Wrapper data={data}>
        <section>
          <section>
            <div className='row'>
              <div className='col-md-4 p-md-0 album-over-order-sm-2'>
                <img
                  className='album-cover-image'
                  src='/static/img/new/album-cover.jpg'
                />
                <div className='bet-button-group-mobile'>
                  <button className='btn btn-default bet-now mr-3'>
                    Bet Now
                  </button>
                  <button className='btn btn-default read-more'>
                    Read More
                  </button>
                </div>
              </div>
              <div className='col-md-8 p-md-0 album-over-order-sm-1'>
                <div className='album-cover'>
                  <div className='album-cover-content'>
                    <p>This Week's Featured Bet</p>
                    <h3>#Verzuz returns with Gucci Mane vs. Jeezy</h3>
                    <div className='bet-button-group'>
                      <button className='btn btn-default bet-now'>
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
          <section className='places-featured'>
            <div className='row'>
              <div className='col-md-12 text-center'>
                <h5>Places we've been featured</h5>
                <div className='places-featured-images'>
                  <img src='/static/img/new/bleacher-logo.png' />
                  <img src='/static/img/new/musically-logo.png' />
                  <img src='/static/img/new/insider-logo.png' />
                </div>
              </div>
            </div>
          </section>
          <section className='fav-artist'>
            <div className='fav-artist-content'>
              <p>Bet On Your Favorite Artists</p>
              <h1>
                Put your money <br></br> where your ears are.
              </h1>
              <div className='mb-56'>
                <span>
                  Clouty is the first and only platform where you can place bets
                  and <br></br> earn money on your favorite artists, events, and albums. Are
                  you <br></br> ready to put your money where your ears are?
                </span>
              </div>
              <button className='btn btn-default'>View All Bets</button>
            </div>
            <div>
              <img
                className='web-image'
                src='/static/img/new/Benefits-Duotone-Image.jpg'
                width='300'
              />
              <img
                className='mobile-image'
                src='/static/img/new/Benefits-Duotone-Image-mobile.jpg'
                width='300'
              />
            </div>
          </section>
          <section>
            <div className='container'>
              <div className='row'>
                <div className='col-md-12 text-center'>
                  <div className='fav-artist-content'>
                    <p>Types Of Betting</p>
                    <h1>How it works</h1>
                    <div className='content-text text-left'>
                      <span>
                        For an artist to qualify for one of our contests, their
                        music must be on either the Big 3: Apple Music, Spotify,
                        or Tidal. If they are only on Soundcloud and Youtube
                        they may not qualify for certain bets. Every contestant
                        will be notified on the results and you can earn REAL
                        cash or tokens to use on future games. The results of
                        the games will ONLY be validated with accurate data and
                        credible announcements to determine each weeks winners.
                        Our charts are powered by Nielsen Soundscan.
                      </span>
                    </div>
                  </div>
                </div>
                <div className='section-services'>
                  <div className='row'>
                    <div className='col-md-4 col-lg-3 col-sm-6'>
                      <div className='single-service'>
                        <div className='part-1'>
                          <div className='service-icon'>&#128200;</div>
                          <h3 className='title text-dark'>First Week Sales</h3>
                          <p className='description'>
                            Place bets on the first week album sales of your
                            favorite rappers.
                          </p>
                          <a href='#'>Place Your Bet</a>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-4 col-lg-3 col-sm-6'>
                      <div className='single-service'>
                        <div className='part-1'>
                          <div className='service-icon'>&#129518;</div>
                          <h3 className='title text-dark'>Over / Under</h3>
                          <p className='description'>
                            Place bets on whether an album will beat or fall
                            under a certain metric.
                          </p>
                          <a href='#'>Place Your Bet</a>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-4 col-lg-3 col-sm-6'>
                      <div className='single-service'>
                        <div className='part-1'>
                          <div className='service-icon'>&#128302;</div>
                          <h3 className='title text-dark'>Futures</h3>
                          <p className='description'>
                            Look into your crystal ball and bet on future events
                            in the rap game.
                          </p>
                          <a href='#'>Place Your Bet</a>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-4 col-lg-3 col-sm-6'>
                      <div className='single-service'>
                        <div className='part-1'>
                          <div className='service-icon'>🎙️</div>
                          <h3 className='title text-dark'>Live Events</h3>
                          <p className='description'>
                            Bet on live events like the Grammys and Billboard
                            Music Awards.
                          </p>
                          <a href='#'>Place Your Bet</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-md-12 text-center stay-tuned'>
                  <p>Stay Tuned for More ways to bet...</p>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className='container'>
              <div className='row'>
                <div className='col-md-12 text-center'>
                  <div className='get-ready-started-content'>
                    <p>Sign Up & Place Your Bets</p>
                    <h1>Ready to get started?</h1>
                    <div>
                      <span>
                        You're just minutes away from placing your first ever
                        music bet. 
                        <br />
                        We'll even give you $2 free when you sign up!
                      </span>
                    </div>
                    <button className='btn btn-default'>Sign Up</button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* <h2 className='f f-subheadline-l  tc lh-title fw7'>
            Bets of the Week
          </h2> */}
          {/* <section className='flex flex-wrap ma3 ma4-l'>
            {questions
              .filter((curr) => curr.gameType !== 'grammy')
              .map((curr) => {
                return (
                  <div className='pv2 pa2-ns w-100 w-50-ns' key={curr.question}>
                    <div
                      className={`white br2 shadow-4 pa3 pa4-ns h-100 ${curr.class}`}>
                      <h1 className='f4 mt0 fw7'>
                        <span role='img'>{curr.emoji}</span> Game #
                        {curr.question}
                      </h1>
                      <p>{curr.description}</p>
                      <p className='f6 fw6'>{curr.details}</p>
                      <DemoForm game={curr} />
                    </div>
                  </div>
                );
              })
              .reverse()
              .slice(0, 4)}
            <a
              href='/games'
              className='b no-underline ma4 pa3 flex center  input-reset ba fl bg-black b--black white grow pointer f4 f3-ns'>
              See More Games
            </a>
          </section> */}
          {/* <article className='ma3 ma4-l'>
            <h2 className='f3 f-subheadline-l  lh-title fw7 flex justify-center'>
              New Releases
            </h2>
            <div className='cf pa2'>
              {album.map((curr) => {
                return (
                  <div className='fl w-50 w-25-m w-20-l pa2' key={curr.album}>
                    <a href={curr.spotify} className='db link dim tc'>
                      <img
                        src={curr.image}
                        className={`w-100 db outline ${classnames({
                          'black-10': !darkMode,
                          'white-10': darkMode,
                        })}`}
                      />
                      <dl className='mt2 f6 lh-copy'>
                        <dt className='clip'>Title</dt>
                        <dd
                          className={`ml0 ${classnames({
                            black: !darkMode,
                            white: darkMode,
                          })} truncate w-100`}>
                          {curr.album}
                        </dd>
                        <dt className='clip'>Artist</dt>
                        <dd
                          className={`ml0 ${classnames({
                            gray: !darkMode,
                            'white-70': darkMode,
                          })} truncate w-100`}>
                          {curr.artist}
                        </dd>
                      </dl>
                    </a>
                  </div>
                );
              })}
            </div>
          </article> */}
          {/* <p className={`${styles.paragraph}`}> */}
          {/* <h2 className='f2 f-subheadline-l measure lh-title fw8'>
            How It Works
          </h2>
          Welcome to{' '} */}
          {/* <a
            href='/about'
            alt='Ableton Push 2'
            title='Ableton Push 2'
            className={`${styles.link}`}>
            Clouty
          </a> */}
          {/* </p> */}
          {/* <h2>Weekly Contents</h2>
        <p className={`${styles.paragraph}`}>
          These questions will be regarding releases and predictions in the rap
          game and we will use data and announcements to determine each weeks
          winners.
          <span role='img' aria-label='Sparkles'>
            ✨
          </span>{' '}
        </p>
        <h2>Live Events</h2> */}
        </section>
        {/* <img width='300px' height='300px' src='/static/img/dare.png' /> */}
      </Wrapper>
    </div>
  );
};

Home.getInitialProps = async ({ req }) => {
  const { origin } = absoluteUrl(req);
  const apiURL = `${origin}`;
  const res = await axios.get(`${apiURL}/api/questions`);
  const projects = await axios.post(`${apiURL}/api/spotify`);
  const questions = res.data;
  const darkMode = getCookie('dark_mode', req) === 'true';
  const loggedIn = getCookie('id_token', req) ? true : false;

  return {
    questions,
    album: projects.data[0].project,
    darkMode,
    loggedIn,
  };
};
Home.propTypes = {
  questions: PropTypes.array,
  album: PropTypes.array,
  darkMode: PropTypes.bool,
  loggedIn: PropTypes.bool,
};
export default Home;
