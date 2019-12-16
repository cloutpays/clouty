import { styles } from '../../constants/styles';
import PropTypes from 'prop-types';
import React from 'react';
import Wrapper from '../../components/Wrapper';

const data = {
  description: 'Make money while putting your intuition on the line.',
  header: 'Your Submission been received!',
};
const Confirmation = ({ wager }) => (
  <div>
    <Wrapper data={data} className='measure-wide'>
      <section>
        <p className={`${styles.paragraph}`}>
          Complete the final step to complete your wager{' '}
          <a
            href={`https://cash.app/$Cloutyio/${wager}`}
            alt='Cash App'
            title='Cash App'
            className={`${styles.link}`}>
            here
          </a>{' '}
          via Cash App.
        </p>
        <p className={`${styles.paragraph}`}>
          Your entry is not valid until we receive confirmation of your wager
          via Cash App. We will also send a SMS text due to Cash App only
          accepting mobile payments.
        </p>
        <p className={`${styles.paragraph}`}>
          All pay outs will be dispersed through Cash App as well. Winnings can
          be used for future gameplay.{' '}
          <span role='img' aria-label='Bulleye'>
            🎯‍
          </span>
          Every contestant will be notified on the results and you can earn cash
          or tokens to use on future games.
        </p>
        <p className={`${styles.paragraph}`}>
          For all issues please email{' '}
          <a className={`${styles.link}`} href='mailto: payments@clouty.io'>
            payments@clouty.io
          </a>
          .
        </p>
      </section>
    </Wrapper>
  </div>
);
Confirmation.getInitialProps = async (context) => {
  const { wager } = context.query;
  return { wager };
};
Confirmation.propTypes = {
  wager: PropTypes.string,
};
export default Confirmation;
