import React from 'react';
import Wrapper from '../components/Wrapper';

const data = {
  description: 'Make money while putting your intuition on the line.',
  header: `How it Works`,
};
const Terms = () => (
  <div>
    <Wrapper data={data}>
      <h1 className='f2 f1-l db tc measure lh-title fw9 mv5'>
        Double your earnings for every bet you win!
      </h1>
      <div className={`lh-copy `}>
        <h2 className='f3 f2-l measure lh-title  fw8'>Betting Guidelines</h2>
        <p>
          Every week, we host live bets about the latest releases and
          predictions in the rap game.
          {/* You can place up to a $50 wager on a  */}
        </p>
        <p>
          Every contestant will be notified on the results and you can earn REAL
          cash or tokens to use on future games.{' '}
        </p>
        <p>
          The results of the games will ONLY be validated with accurate data and
          credible announcements to determine each weeks winners{' '}
        </p>
        <h2 className='f3 f2-l measure lh-title  fw8'>Type of Bets</h2>
        {/* <h2 className='f3 f2-l measure lh-title fw7'>Type of Bets</h2> */}
        <div className='lh-copy '>
          <p className={``}>Our bets are based in several categories:</p>
          <p className={`tc fw8 `}>First Week Sales</p>
          <div className='pv2 pa2-ns w-100 w-50-ns'>
            <div className='white br2 shadow-4 pa3 pa4-ns h-100 grow style-guide'>
              <h1 className='f4 mt0 fw7'>
                <span role='img'>🍊</span> Game #2
              </h1>
              <p>
                Larry June has dropped five projects in 2019. Will he close out
                2019 with a 6th?
              </p>
            </div>
          </div>
          <p className={`tc fw8  b`}>Over/Under</p>
          <div className='pv2 pa2-ns w-100 w-50-ns'>
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
          {/* <p className={`tc fw8  b`}>Fill in the Blank</p> */}
          <p className={`tc fw8  b`}>Will this happen or not</p>
          <div className='pv2 pa2-ns w-100 w-50-ns'>
            <div className='white br2 shadow-4 pa3 pa4-ns h-100 grow apprentice-at'>
              <h1 className='f4 mt0 fw7'>
                <span role='img'>🃏</span> Game #19
              </h1>
              <p>
                Jay Electronica is almost more of a legend without an album than
                he is with one. In fact, he&apos;s never dropped a full length
                project. Will this news of his album dropping hold true? Or is
                it simply a bluff.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <div>
        <span className={`${styles.link}`}>Straight Bets</span>
      </div> */}
    </Wrapper>
  </div>
);

export default Terms;
