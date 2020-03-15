import { styles } from '../constants/styles';
import React from 'react';
// import SignUpForm from '../components/SignUpForm';
import Wrapper from '../components/Wrapper';

const data = {
  description: 'Make money while putting your intuition on the line.',
  header: `The 🌎's first music betting platform.`,
};
const Home = () => (
  <div>
    <Wrapper data={data} className='measure-wide'>
      <section>
        <p className={`${styles.paragraph}`}>
          This is your chance to double your money while putting your intuition
          on the line{' '}
          <span role='img' aria-label='Bulleye'>
            🎯‍
          </span>{' '}
        </p>
        <a
          href='/games'
          alt='Ableton Push 2'
          title='Ableton Push 2'
          className={`${styles.link}`}>
          Get Started
        </a>{' '}
        <h2>Double Your Money</h2>
        <p className={`${styles.paragraph}`}>
          Welcome to{' '}
          <a
            href='/about'
            alt='Ableton Push 2'
            title='Ableton Push 2'
            className={`${styles.link}`}>
            Clouty
          </a>
        </p>
        <h2>Weekly Contents</h2>
        <p className={`${styles.paragraph}`}>
          These questions will be regarding releases and predictions in the rap
          game and we will use data and announcements to determine each weeks
          winners.
          <span role='img' aria-label='Sparkles'>
            ✨
          </span>{' '}
        </p>
        <h2>Secure Payments</h2>
      </section>
    </Wrapper>
  </div>
);

export default Home;
