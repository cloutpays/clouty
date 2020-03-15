import { styles } from '../constants/styles';
import DemoForm from '../components/DemoForm';
import PropTypes from 'prop-types';
import React from 'react';
import Wrapper from '../components/Wrapper';
import absoluteUrl from 'next-absolute-url';
import axios from 'axios';

const data = {
  description: 'Make money while putting your intuition on the line.',
  header: `Welcome to Clouty`,
};
const Home = ({ questions }) => (
  <div>
    <Wrapper data={data}>
      <section>
        {/* <h1 className='f1 fw9'>Welcome to Clouty</h1> */}
        <h1 className='f1 f-subheadline-l db tc measure lh-title fw9 mv5'>
          The 🌎&apos;s first music betting platform.
        </h1>
        <div>
          <p className={`${styles.paragraph}`}>
            Every week, we will host live bets about the latest releases and
            predictions in the rap game.{' '}
            <a
              href='/about'
              alt='Ableton Push 2'
              title='Ableton Push 2'
              className={`${styles.link}`}>
              Double your money
            </a>{' '}
            while putting your intuition on the line.{' '}
          </p>
        </div>
        <div className='mt3 pv4'>
          <span className='b pa3 mr2 input-reset ba b--black bg-transparent grow pointer f4'>
            Sign Up
          </span>
          <span className='b pa3 mr2  input-reset ba b--black bg-transparent grow pointer f4'>
            Learn More
          </span>
        </div>
        <h2 className='f3 f-subheadline-l measure lh-title fw7'>
          Bets of the Week
        </h2>
        <section className='flex flex-wrap'>
          <div className='pv2 pa2-ns w-100 w-50-ns'>
            <div className='white br2 shadow-4 pa3 pa4-ns h-100 grow mark-gierl'>
              <h1 className='f4 mt0 fw7'>
                <span role='img'>🥊</span> Game #25
              </h1>
              <p>
                Don Toliver and Jack Harlow both dropped projects last night
                with “Heaven or Hell” , and “Sweet Action”. Who will have the
                higher number of sales 1st week?
              </p>
              <DemoForm game={questions[7]} />
            </div>
          </div>
          <div className='pv2 pa2-ns w-100 w-50-ns'>
            <a href='/games/27' className='no-underline white'>
              <div className='white br2 shadow-4 pa3 pa4-ns h-100 grow kanye-wtf'>
                <h1 className='f4 mt0 fw7'>
                  <span role='img'>🏆</span> Game #27
                </h1>
                <p>
                  Rich the Kid and Blueface both dropped projects last night
                  with, “Boss Man” and “Find the Beat”. Who will have the higher
                  number of sales 1st week?
                </p>
                <DemoForm game={questions[8]} />
              </div>
            </a>
          </div>
        </section>
        <p className={`${styles.paragraph}`}>
          {/* <h2 className='f2 f-subheadline-l measure lh-title fw8'>
            How It Works
          </h2>
          Welcome to{' '} */}
          {/* <a
            href='/about'
            alt='Ableton Push 2'
            title='Ableton Push 2'
            className={`${styles.link}`}>
            Clouty
          </a> */}
        </p>
        {/* <h2>Weekly Contents</h2>
        <p className={`${styles.paragraph}`}>
          These questions will be regarding releases and predictions in the rap
          game and we will use data and announcements to determine each weeks
          winners.
          <span role='img' aria-label='Sparkles'>
            ✨
          </span>{' '}
        </p>
        <h2>Live Events</h2> */}
      </section>
      {/* <img width='300px' height='300px' src='/static/img/dare.png' /> */}
    </Wrapper>
  </div>
);

Home.getInitialProps = async ({ req }) => {
  const { origin } = absoluteUrl(req);
  const apiURL = `${origin}`;
  const res = await axios.get(`${apiURL}/api/questions`);
  const questions = res.data;
  return {
    questions: questions.filter((game) => game.gameType === 'game'),
  };
};
Home.propTypes = {
  questions: PropTypes.array,
};
export default Home;
