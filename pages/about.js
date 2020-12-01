import React from 'react';
import Wrapper from '../components/layout/Wrapper';

const data = {
  description: 'Make money while putting your intuition on the line.',
  header: 'Clouty is a platform that was created from the love of music.',
};
const Home = () => (
  <Wrapper data={data}>
    <div style={{backgroundColor: "#EFE8F4", marginTop: "-100px"}}>
      <div className='row'>
        <div className='col-md-12'>
          <div className='about-banner-content'>
            <div className='row'>
              <div className='col-md-6'>
                <p>Our Story</p>
                <h1>We are the first of our kind. 🥇</h1>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <p>
                  Clouty was born December 2019 when our founder, David Umeh
                  discovered the artists Foggieraw and Ankhlejohn. Upon hearing
                  their cadences and presence he knew they had serious shot at
                  making it big. In a large group-chat where nothing but music
                  was discussed and debated, he went on to say,
                  &ldquo;<strong>This guy is gonna blow....if I could put my money on it, I
                  would.</strong>&ldquo;
                </p>
              </div>
              <div className='col-md-6'>
                <p>
                  Upon hearing their cadences and presence he knew they had
                  serious shot at making it big. In a large group-chat where
                  nothing but music was discussed and debated, he went on to
                  say, <strong>The first and only platform when audiophiles could put
                  their money where their ears are.</strong>
                </p>
              </div>
            </div>
            <button className='btn btn-default'>Contact Us</button>
          </div>
        </div>
      </div>
    </div>
    <section className='about-service'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-3 title'>
            <h1>Our Mission At Clouty</h1>
          </div>
          <div className='col-md-9'>
            <div className='row'>
              <div className='col-md-6'>
                <div className='about-service-item'>
                  <h5>Clarity</h5>
                  <p>
                    Creative conversion buzz seed money twitter alpha release
                    analytics termsheet MVP early adopters long tail
                    business-to-consumer strategy. Series A financing paradigm
                    shift growth hacking bootstrapping seed money.
                  </p>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='about-service-item'>
                  <h5>Simplicity</h5>
                  <p>
                    Creative conversion buzz seed money twitter alpha release
                    analytics termsheet MVP early adopters long tail
                    business-to-consumer strategy. Series A financing paradigm
                    shift growth hacking bootstrapping seed money.
                  </p>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='about-service-item'>
                  <h5>Clarity</h5>
                  <p>
                    Creative conversion buzz seed money twitter alpha release
                    analytics termsheet MVP early adopters long tail
                    business-to-consumer strategy. Series A financing paradigm
                    shift growth hacking bootstrapping seed money.
                  </p>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='about-service-item'>
                  <h5>Simplicity</h5>
                  <p>
                    Creative conversion buzz seed money twitter alpha release
                    analytics termsheet MVP early adopters long tail
                    business-to-consumer strategy. Series A financing paradigm
                    shift growth hacking bootstrapping seed money.
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
            <div className='about-fav-artist-content'>
              <p>Sign Up & Place Your Bets</p>
              <h1>Ready to get started?</h1>
              <div>
                <span>
                  You're just minutes away from placing your first ever music
                  bet.
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
  </Wrapper>
);

export default Home;
