import { styles } from '../constants/styles';
import React from 'react';
import Wrapper from '../components/Wrapper';

const data = {
  description: 'Make money while putting your intuition on the line.',
  header: 'Connect with the squad',
};
const Contact = () => (
  <div>
    <Wrapper data={data} className='measure-wide'>
      <section>
        <p className={`${styles.paragraph}`}>
          All Media inquiries:{' '}
          <a href='mailto:breemz@clouty.io ' className={`${styles.link}`}>
            breemz@clouty.io
          </a>{' '}
          <span role='img' aria-label='Bulleye'>
            🎯‍
          </span>
        </p>
        <p className={`${styles.paragraph}`}>
          All Business inquiries:{' '}
          <a href='mailto:umeh@clouty.io ' className={`${styles.link}`}>
            umeh@clouty.io
          </a>{' '}
          <span role='img' aria-label='Bulleye'>
            🎯‍
          </span>
        </p>
        <p className={`${styles.paragraph}`}>
          Game related questions:{' '}
          <a href='mailto:julius@clouty.io ' className={`${styles.link}`}>
            julius@clouty.io
          </a>{' '}
          <span role='img' aria-label='Bulleye'>
            🎯‍
          </span>{' '}
        </p>
      </section>
    </Wrapper>
  </div>
);

export default Contact;
