import { styles } from '../../constants/styles';
import React from 'react';
import Wrapper from '../../components/Wrapper';

const data = {
  description: 'Make money while putting your intuition on the line.',
  header: 'Your submission has been received!',
};
const Confirmation = () => (
  <div>
    <Wrapper data={data} className='measure-wide'>
      <section>
        <p className={`${styles.paragraph}`}>
          Your wager has been entered into our system. May the odds forever be
          in your favor!
        </p>
        <p className={`${styles.paragraph}`}>
          Every contestant will be notified of the results and you will be able
          to earn cash or tokens in realtime.
        </p>
        <p className={`${styles.paragraph}`}>
          All pay outs will be dispersed through one of our three channels.
          Winnings can be used for future gameplay.
          <span role='img' aria-label='Bulleye'>
            🎯‍
          </span>
        </p>
        <p className={`${styles.paragraph}`}>
          For all issues please email{' '}
          <a className={`${styles.link}`} href='mailto: info@clouty.io'>
            info@clouty.io
          </a>
          .
        </p>
      </section>
    </Wrapper>
  </div>
);

export default Confirmation;
