import React from 'react';
import Wrapper from '../components/layout/Wrapper';

const data = {
  description: 'Make money while putting your intuition on the line.',
  header: `How it Works`,
};
const Terms = () => (
  <Wrapper data={data}>
    <div className='ma3 ma4-l'>
      <h1 className='f2 f1-l db tc measure lh-title fw9 mv5'>
        Double your earnings for every bet you win!
      </h1>
      <div className={`lh-copy tc `}>
        <h2 className='f3 f2-l  lh-title fw8'>Betting Guidelines</h2>
        <p>
          For an artist to qualify for one of our contests, their music must be
          on either the Big 3: Apple Music, Spotify, or Tidal. If they are only
          on Soundcloud and Youtube they may not qualify for certain bets.
        </p>
        <p>
          Every contestant will be notified on the results and you can earn REAL
          cash or tokens to use on future games.{' '}
        </p>
        <p>
          The results of the games will ONLY be validated with accurate data and
          credible announcements to determine each weeks winners. Our charts are
          powered by Nielsen Soundscan{' '}
        </p>
        <h2 className='f3 f2-l tc lh-title fw8'>Type of Bets</h2>
        {/* <h2 className='f3 f2-l measure lh-title fw7'>Type of Bets</h2> */}
        <div className='lh-copy'>
          <p className={``}>Our bets are based in several categories:</p>
          <h3 className={`tc fw7 `}>First Week Sales</h3>
          <div className='flex items-center justify-center '>
            <div className='pv2 pa2-ns w-80 w-80-ns'>
              <div className='white br2 shadow-4 pa3 pa4-ns h-100 grow mark-gierl'>
                <h1 className='f4 mt0 fw7'>
                  <span role='img'>👾</span> Game #26
                </h1>
                <p>
                  Do you think #EternalAtake will sell more first week than
                  #Astroworld (550k) ? 🤔{' '}
                </p>
              </div>
            </div>
          </div>{' '}
          <h3 className={`tc fw7  b`}>Over/Under</h3>
          <div className='flex items-center justify-center '>
            <div className='pv2 pa2-ns w-80 w-80-ns'>
              <div className='white br2 shadow-4 pa3 pa4-ns h-100 grow kanye-wtf'>
                <h1 className='f4 mt0 fw7'>
                  <span role='img'>👨‍🎤</span> Game #29
                </h1>
                <p>
                  Lil Uzi dropped the deluxe version of Eternal Atake. Will this
                  deluxe album&apos;s first week sales be over 150k units? Or
                  under?{' '}
                </p>
              </div>
            </div>
          </div>
          {/* <p className={`tc fw8  b`}>Fill in the Blank</p> */}
          <h3 className={`tc fw7  b`}>Futures</h3>
          <div className='flex items-center justify-center '>
            <div className='pv2 pa2-ns w-80 w-80-ns'>
              <div className='white br2 shadow-4 pa3 pa4-ns h-100 grow apprentice-at'>
                <h1 className='f4 mt0 fw7'>
                  <span role='img'>🃏</span> Game #19
                </h1>
                <p>
                  Jay Electronica is almost more of a legend without an album
                  than he is with one. In fact, he&apos;s never dropped a full
                  length project. Will this news of his album dropping hold
                  true? Or is it simply a bluff.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div>
        <span className={`${styles.link}`}>Straight Bets</span>
      </div> */}
    </div>
  </Wrapper>
);

export default Terms;
