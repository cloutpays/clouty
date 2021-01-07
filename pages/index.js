import { getCookie } from '../lib/session';
import PropTypes from 'prop-types';
import React from 'react';
import Wrapper from '../components/layout/Wrapper';
const contentful = require('contentful');

const data = {
  description: 'Make money while putting your intuition on the line.',
  header: `Welcome to Clouty`,
  home_page: true,
};

const Home = ({ latestPost }) => {
  console.log(latestPost);
  return (
    <Wrapper data={data}>
      <section>
        <section>
          <div className='row'>
            <div className='col-md-4 p-md-0 album-over-order-sm-2'>
              <img
                className='album-cover-image'
                src={`http:${latestPost.url}`}
              />
              <div className='bet-button-group-mobile'>
                <a href='/games'>
                  <button className='btn btn-default bet-now mr-3'>
                    Bet Now
                  </button>
                </a>
                <a href='/about'>
                  <button className='btn btn-default read-more'>
                    Read More
                  </button>
                </a>
              </div>
            </div>
            <div className='col-md-8 p-md-0 album-over-order-sm-1'>
              <div className='album-cover'>
                <div className='album-cover-content'>
                  <p>This Week&apos;s Featured Bet</p>
                  <h3>{latestPost.description}</h3>
                  <div className='bet-button-group'>
                    <button className='btn btn-default bet-now'>Bet Now</button>
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
              <h5>Places we&apos;ve been featured</h5>
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
                and <br></br> earn money on your favorite artists, events, and
                albums. Are you <br></br> ready to put your money where your
                ears are?
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
                      or Tidal. If they are only on Soundcloud and Youtube they
                      may not qualify for certain bets. Every contestant will be
                      notified on the results and you can earn REAL cash or
                      tokens to use on future games. The results of the games
                      will ONLY be validated with accurate data and credible
                      announcements to determine each weeks winners. Our charts
                      are powered by Nielsen Soundscan.
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
                          Place bets on whether an album will beat or fall under
                          a certain metric.
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
                      You&apos;re just minutes away from placing your first ever
                      music bet.
                      <br />
                      We&apos;ll even give you $2 free when you sign up!
                    </span>
                  </div>
                  <button className='btn btn-default'>Sign Up</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </Wrapper>
  );
};

Home.getInitialProps = async ({ req }) => {
  const loggedIn = getCookie('id_token', req) ? true : false;
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
    loggedIn,
    latestPost,
  };
};
Home.propTypes = {
  loggedIn: PropTypes.bool,
  latestPost: PropTypes.object,
};
export default Home;
