import { styles } from '../../constants/styles';
import React from 'react';
import Wrapper from '../../components/Wrapper';

const data = {
  description: 'Make money while putting your intuition on the line.',
  header: 'Your Submission been received!',
};
const Confirmation = () => (
  <div>
    <Wrapper data={data} className='measure-wide'>
      <section>
        <p className={`${styles.paragraph}`}>
          Your payout has been requested & Clouty will send the request to you
          via the channel selected.
        </p>
        <p className={`${styles.paragraph}`}>
          It is expected to arrive within the next 1-2 days.{' '}
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
