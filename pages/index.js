import { getCookie } from '../lib/session';
import { styles } from '../constants/styles';
import DemoForm from '../components/gameplay/DemoForm';
import DisclaimerModal from '../components/DisclaimerModal';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import Wrapper from '../components/layout/Wrapper';
import absoluteUrl from 'next-absolute-url';
import axios from 'axios';
import classnames from 'classnames';
const data = {
  description: 'Make money while putting your intuition on the line.',
  header: `Welcome to Clouty`,
};

const Home = ({ questions, darkMode, loggedIn, album }) => {
  return (
    <div>
      <Wrapper data={data}>
        <section>
          {/* <h1 className='f1 fw9'>Welcome to Clouty</h1> */}
          <h1 className='f1 f-subheadline-l db tc measure lh-title fw9 mv5 mh2'>
            The 🌎&apos;s first music betting platform.
          </h1>
          <div>
            <p className={`${styles.paragraph}`}>
              Every week we host live bets about the latest releases and
              predictions in the rap game.
            </p>
            <p className={`${styles.paragraph}`}>
              Sign up today and receive a free $2 credit towards your bets.
              Also, for a limited time enjoy
              <span className='i b'> no fees </span> for all bets!
            </p>
            <DisclaimerModal />
          </div>
          <section className='mt3 w-100 dib pv4 flex items-center justify-center '>
            <div className='b pa3 mr2  input-reset ba b--black bg-transparent grow pointer f4'>
              <a
                className={`no-underline ${classnames({
                  black: !darkMode,
                  white: darkMode,
                })}`}
                href={loggedIn ? '/user' : '/signup'}>
                {loggedIn ? 'Play Now' : 'Sign Up'}
              </a>
            </div>
            <div className='b pa3 mr2 input-reset ba bg-black b--black grow pointer f4'>
              {' '}
              <Link href='/learnmore'>
                <a className='no-underline white'>Learn More</a>
              </Link>
            </div>
          </section>
          {/* <section className='bg-black white'>
          <h2 className='f3 tc lh-title fw5 pt5 '>IN THE PRESS</h2>
          <div className='items-start flex justify-center flex-wrap w-100 pv4'>
            <div
              className='link hover-silver db mv1  tc w-30'
              href='https://www.instagram.com/p/B9zp7bYFkA_/'
              title='Bleacher Report'>
              <img
                className=' h3 h4-ns'
                // style={{ filter: 'brightness(0)' }}
                src='/static/img/br_logo.png'
              />
              <p>No clue how this works... I’m in</p>
            </div>
            <div
              className='link hover-silver db mv1  tc w-30'
              href='https://musically.com/2020/01/16/clouty-wants-fans-to-place-bets-on-rap-predictions/'
              title='Musically'>
              <img
                className='dib h3 h4-ns'
                // style={{ filter: 'brightness(0)' }}
                src='/static/img/musically.png'
              />
              <p>Clouty wants fans to place bets on rap predictions</p>
            </div>
          </div>
        </section>
         */}
          <h2 className='f f-subheadline-l  tc lh-title fw7'>
            Bets of the Week
          </h2>
          <section className='flex flex-wrap ma3 ma4-l'>
            {questions
              .filter((curr) => curr.gameType !== 'grammy')
              .map((curr) => {
                return (
                  <div className='pv2 pa2-ns w-100 w-50-ns' key={curr.question}>
                    <div
                      className={`white br2 shadow-4 pa3 pa4-ns h-100 ${curr.class}`}>
                      <h1 className='f4 mt0 fw7'>
                        <span role='img'>{curr.emoji}</span> Game #
                        {curr.question}
                      </h1>
                      <p>{curr.description}</p>
                      <p className='f6 fw6'>{curr.details}</p>
                      <DemoForm game={curr} />
                    </div>
                  </div>
                );
              })
              .reverse()
              .slice(0, 4)}
            <a
              href='/games'
              className='b no-underline ma4 pa3 flex center  input-reset ba fl bg-black b--black white grow pointer f4 f3-ns'>
              See More Games
            </a>
          </section>
          <article className='ma3 ma4-l'>
            <h2 className='f3 f-subheadline-l  lh-title fw7 flex justify-center'>
              New Releases
            </h2>
            <div className='cf pa2'>
              {album.map((curr) => {
                return (
                  <div className='fl w-50 w-25-m w-20-l pa2' key={curr.album}>
                    <a href={curr.spotify} className='db link dim tc'>
                      <img
                        src={curr.image}
                        className={`w-100 db outline ${classnames({
                          'black-10': !darkMode,
                          'white-10': darkMode,
                        })}`}
                      />
                      <dl className='mt2 f6 lh-copy'>
                        <dt className='clip'>Title</dt>
                        <dd
                          className={`ml0 ${classnames({
                            black: !darkMode,
                            white: darkMode,
                          })} truncate w-100`}>
                          {curr.album}
                        </dd>
                        <dt className='clip'>Artist</dt>
                        <dd
                          className={`ml0 ${classnames({
                            gray: !darkMode,
                            'white-70': darkMode,
                          })} truncate w-100`}>
                          {curr.artist}
                        </dd>
                      </dl>
                    </a>
                  </div>
                );
              })}
            </div>
          </article>
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
};

Home.getInitialProps = async ({ req }) => {
  const { origin } = absoluteUrl(req);
  const apiURL = `${origin}`;
  const res = await axios.get(`${apiURL}/api/questions`);
  const projects = await axios.post(`${apiURL}/api/spotify`);
  const questions = res.data;
  const darkMode = getCookie('dark_mode', req) === 'true';
  const loggedIn = getCookie('id_token', req) ? true : false;

  return {
    questions,
    album: projects.data[0].project,
    darkMode,
    loggedIn,
  };
};
Home.propTypes = {
  questions: PropTypes.array,
  album: PropTypes.array,
  darkMode: PropTypes.bool,
  loggedIn: PropTypes.bool,
};
export default Home;
