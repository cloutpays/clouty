import { styles } from '../constants/styles';
import React from 'react';
import Wrapper from '../components/Wrapper';

const data = {
  description: 'Make money while putting your intuition on the line.',
  header: `How it Works`,
};
const Terms = () => (
  <div>
    <Wrapper data={data}>
      <h1 className='f1 f-subheadline-l db tc measure lh-title fw9 mv5'>
        Double your earnings for every bet you win!
      </h1>
      <div>
        <p className={`${styles.paragraph}`}>
          Every week, we will host live bets about the latest releases and
          predictions in the rap game. This is a chance for you and your friends
          to double your money while putting your intuition on the line 🎯‍
        </p>
        <p className={`${styles.paragraph}`}>
          {' '}
          Every contestant will be notified on the results and you can earn cash
          or tokens to use on future games. These questions will be regarding
          releases and predictions and we will use data and announcements to
          determine each weeks winners{' '}
        </p>
      </div>
      <h2 className='f3 f-subheadline-l measure lh-title fw7'>
        Betting Guidelines
      </h2>
      <h2 className='f3 f-subheadline-l measure lh-title fw7'>Type of Bets</h2>
      {/* <div>
        <span className={`${styles.link}`}>Straight Bets</span>
      </div> */}
    </Wrapper>
  </div>
);

export default Terms;
