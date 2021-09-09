import React from 'react';
import Wrapper from '../components/layout/Wrapper';

const data = {
  description: 'Make money while putting your intuition on the line.',
  header: 'Clouty is a platform that was created from the love of music.',
};
const Home = () => (
  <Wrapper data={data}>
    <div
      className='about-page'
      style={{ backgroundColor: '#EFE8F4', marginTop: '-8vw' }}>
      <div className='row'>
        <div className='col-md-12'>
          <div className='d-flex-about'>
            <div className='about-banner-content'>
              <div className='row'>
                <div className='col-md-6'>
                  <p>Our Story</p>
                  <h1>
                    We’re the first <br></br> of our kind. 🥇
                  </h1>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-6'>
                  <p>
                    Clouty was born December 2019 when our founder, David Umeh
                    discovered the artists Foggieraw and Ankhlejohn. Upon
                    hearing their cadences and presence he knew they had serious
                    shot at making it big. In a large group-chat where nothing
                    but music was discussed and debated, he went on to say,
                    &ldquo;
                    <strong>
                      This guy is gonna blow....if I could put my money on it, I
                      would.
                    </strong>
                    &ldquo;
                  </p>
                </div>
                <div className='col-md-6'>
                  <p>
                    Upon hearing their cadences and presence he knew they had
                    serious shot at making it big. In a large group-chat where
                    nothing but music was discussed and debated, he went on to
                    say,{' '}
                    <strong>
                      The first and only platform when audiophiles could put
                      their money where their ears are.
                    </strong>
                  </p>
                </div>
              </div>
              <button className='btn btn-default'>Contact Us</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section className='about-service'>
      <div className='about-container'>
        <div className='row'>
          <div className='col-md-3 title'>
            <h1>
              Our Mission <br></br> At Clouty
            </h1>
          </div>
          <div className='col-md-9'>
            <div className='row'>
              <div className='col-md-6'>
                <div className='about-service-item'>
                  <h5>Reimagine</h5>
                  <p>
                    We’re allowing people to “predict the weather” and make
                    predictions on the forecast of their favorite artists backed
                    by data in the music industry.
                  </p>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='about-service-item'>
                  <h5>Discovery</h5>
                  <p>
                    As the platform grows and evolves, our vision for the future
                    includes a realm where clout is not a pre requisite but
                    instead a side effect of creativity and pure artistry. It’s
                    time to level the playing field.
                  </p>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='about-service-item'>
                  <h5>Simplicity</h5>
                  <p>
                    We are aware that this is a new industry in of itself. At no
                    point in this process do we want anyone to find themselves
                    confused. We encourage reaching out to our help line and
                    will continue to implement features that embody ease of use.
                  </p>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='about-service-item'>
                  <h5>Music</h5>
                  <p>
                    Almost needless to say, we at Clouty are music lovers and
                    that is the foundation for everything Clouty represents.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12 text-center'>
            <div className='get-ready-started-content'>
              <p>Sign Up & Start Trading</p>
              <h1>Ready to get started?</h1>
              <div>
                <span>
                  You’re just minutes away from placing your first ever music
                  bet.
                  <br />
                  We’ll even give you $2 free when you sign up!
                </span>
              </div>
              <button className='btn btn-default'>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Wrapper>
);

export default Home;
