import { styles } from '../constants/styles';
import React from 'react';
import Wrapper from '../components/Wrapper';

const data = {
  description: 'Make money while putting your intuition on the line.',
  header: 'Your Submission been received!',
};
const Confirmation = () => (
  <div>
    <Wrapper data={data} className='measure-wide'>
      If you did not receive a text, you can click below to pay as well
      <br />
      <br />
      The final entry date is <strong>Tuesday, December 3rd.</strong>
      <br />
      <section>
        <p className={`${styles.paragraph}`}>
          Expect a text with instructions to complete your wager via CASH APP.
          Your entry is not valid until we receive confirmation of your{' '}
          <a
            href={`https://cash.app/$Cloutyio/${'wager'}`}
            alt='Cash App'
            title='Cash App'
            className={`${styles.link}`}>
            Wager
          </a>
          via Cash App. Every week, we will host contest about the latest
          releases and predictions in the rap game.{' '}
        </p>
        <p className={`${styles.paragraph}`}>
          All pay outs will be dispersed through Cash App as well. Winnings can
          be used for future gameplay.{' '}
          <span role='img' aria-label='Bulleye'>
            🎯‍
          </span>{' '}
          Every contestant will be notified on the results and you can earn cash
          or tokens to use on future games.
        </p>
        <p className={`${styles.paragraph}`}>
          For all issues please email{' '}
          <a className={`${styles.link}`} href='mailto: payments@clouty.io'>
            {' '}
            payments@clouty.io
          </a>
          . For all media inquiries please email
          <a className={`${styles.link}`} href='mailto: breemz@clouty.io'>
            {' '}
            breemz@clouty.io
          </a>
        </p>
      </section>
    </Wrapper>
  </div>
);

export default Confirmation;
