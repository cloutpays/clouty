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
                <a href={`/games`}>
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
                  <p>This Week&apos;s Featured Market</p>
                  <h3>{latestPost.description}</h3>
                  <div className='bet-button-group'>
                    <a href='/games'>
                      <button className='btn btn-default bet-now'>
                        Bet Now
                      </button>
                    </a>
                    <a href='/games'>
                      <button className='btn btn-default all-bet'>
                        View All Bets
                      </button>
                    </a>
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
            <p>Bet On Your Favorite Artists, Classic Records and New Talent</p>
            <h1>
              Put your money <br></br> where your ears are.
            </h1>
            <div className='mb-56'>
              <span>
                Music is a widely undervalued asset and Clouty unbundles it by
                allowing partakers to trade on those underlying metrics,
                bringing liquidity to the one-sided $50b industry. Our markets
                update in real time.
              </span>
            </div>
            <button className='btn btn-default'>View All Markets</button>
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
                      For an artist to qualify for one of our markets, their
                      music must be on either the Big 3: Apple Music, Spotify,
                      or Tidal. If they are only on SoundCloud and YouTube they
                      may not qualify for certain contracts. Our markets update
                      in real time and participants will be able to trade
                      contracts at-will earning real cash or digital currency to
                      use on future contracts. The Alpha Data behind our markets
                      are listed in our terms and conditions.
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
                        <h3 className='title text-dark'>Chart Positioning</h3>
                        <p className='description'>
                          Place a contract on the trajectory of any song&apos;s
                          position in the Hot 100
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='col-md-4 col-lg-3 col-sm-6'>
                    <div className='single-service'>
                      <div className='part-1'>
                        <div className='service-icon'>💿</div>
                        <h3 className='title text-dark'>RIAA Certification</h3>
                        <p className='description'>
                          Trade on the time it will take for a record to reach
                          Gold, Platinum or Diamond status
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='col-md-4 col-lg-3 col-sm-6'>
                    <div className='single-service'>
                      <div className='part-1'>
                        <div className='service-icon'>&#128302;</div>
                        <h3 className='title text-dark'>Futures</h3>
                        <p className='description'>
                          Bet on specific predictions ranging from release
                          dates, subject content, record length and features
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='col-md-4 col-lg-3 col-sm-6'>
                    <div className='single-service'>
                      <div className='part-1'>
                        <div className='service-icon'>🎙️</div>
                        <h3 className='title text-dark'>Live Events</h3>
                        <p className='description'>
                          Bet on the outcome of award show categories and
                          concert set-lists
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-md-12 text-center stay-tuned'>
                <p>Stay Tuned for More ways to trade...</p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12 text-center'>
                <div className='get-ready-started-content'>
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
    .getEntries({ content_type: 'latestPost' })
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
