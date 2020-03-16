import { getCookie } from '../lib/session';
import { styles } from '../constants/styles';
import DemoForm from '../components/DemoForm';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import Wrapper from '../components/Wrapper';
import absoluteUrl from 'next-absolute-url';
import axios from 'axios';
import classNames from 'classnames';

const data = {
  description: 'Make money while putting your intuition on the line.',
  header: `Welcome to Clouty`,
};

const albums = [
  {
    artist: 'Pop Smoke',
    album: 'Meet The Woo 2',
    image:
      'https://upload.wikimedia.org/wikipedia/en/thumb/1/13/Pop_Smoke_-_Meet_the_Woo_2.png/220px-Pop_Smoke_-_Meet_the_Woo_2.png',
    spotify: 'https://open.spotify.com/album/4MZnolldq7ciKKlbVDzLm5',
  },
  {
    artist: 'Don Toliver',
    album: 'Heaven or Hell',
    image:
      'https://images.complex.com/complex/images/c_fill,dpr_auto,q_90,w_920/fl_lossy,pg_1/mhgdsrhn3a90ytkkkw3x/don-toliver-heaven-or-hell-stream',
    spotify: 'https://open.spotify.com/album/7z4GhRfLqfSkqrj5F3Yt2B',
  },
  {
    artist: 'Lil Uzi Vert',
    album: 'Eternal Atake (Deluxe)',
    image:
      'https://images.complex.com/complex/images/c_fill,dpr_auto,q_90,w_920/fl_lossy,pg_1/ebjrkgp7iu5fajw98mzn/lil-uzi-vert-eternal-atake-deluxe-stream',
    spotify: 'https://open.spotify.com/album/0fEO7g2c5onkaXsybEtuD2',
  },
  {
    artist: 'Jack Harlow',
    album: 'Sweet Action',
    image:
      'https://ssla.ulximg.com/image/750x750/cover/1584077338_165f8d2a6837010530db8217968bb1e4.jpg/72170d0cb246d618ac1549bbb1631bd1/1584077338_d76498d52286f7223a6b47f796224344.jpg',
    spotify: 'https://open.spotify.com/album/7AaqMMiYMvnMB3RcS8u3EY',
  },
  {
    artist: 'Rich the Kid',
    album: 'Boss Man',
    image:
      'https://images.complex.com/complex/images/c_fill,dpr_auto,q_90,w_920/fl_lossy,pg_1/fv9exqwsgrwcymbd1btv/rich-the-kid',
    spotify: 'https://open.spotify.com/album/1YOx6ZVgiv9GEluUwBWevi',
  },
  {
    artist: 'Blueface',
    album: 'Find The Beat',
    image:
      'https://images.complex.com/complex/images/c_fill,dpr_auto,q_90,w_920/fl_lossy,pg_1/sdxhbfaip2aklfvv40zx/blueface-find-the-beat-stream',
    spotify: 'https://open.spotify.com/album/2BLEkA5FiMxrp1ldVn4Ajqc',
  },
  {
    artist: 'Jay Electronica',
    album: 'A Written Testimony',
    image:
      'https://static.stereogum.com/uploads/2020/03/Jay-Electronica-A-Written-Testimony-1584129087-640x640.jpeg',
    spotify: 'https://open.spotify.com/album/0ZJt4dCoI19u71k37E1nQu',
  },
  {
    artist: 'Pop Smoke',
    album: 'Meet the Woo 2',
    image:
      'https://upload.wikimedia.org/wikipedia/en/thumb/1/13/Pop_Smoke_-_Meet_the_Woo_2.png/220px-Pop_Smoke_-_Meet_the_Woo_2.png',
    spotify: 'https://open.spotify.com/album/4MZnolldq7ciKKlbVDzLm5',
  },
  {
    artist: 'Brent Faiyaz',
    album: 'Fuck The World',
    image:
      'https://images.genius.com/65fa2295b92218e5c10cbed945537758.1000x1000x1.jpg',
    spotify: 'https://open.spotify.com/album/3vi20DRHkqv4HyVg9Rt9wC',
  },
  {
    artist: 'G Herbo',
    album: 'PTSD',
    image:
      'https://media.pitchfork.com/photos/5e5d8aa3230d040009b1f403/1:1/w_600/PTSD_G%20Herbo.jpg',
    spotify: 'https://open.spotify.com/album/0jH6iWykjOuyW7Y8zNKMBkc',
  },
  {
    artist: 'Lil Baby',
    album: 'My Turn',
    image:
      'https://media.pitchfork.com/photos/5e56ce610e27b00008f7b845/1:1/w_320/My%20Turn_Lil%20Baby.jpg',
    spotify: 'https://open.spotify.com/album/1ynyQdPQiXdYJNQEDL1S3d',
  },
];
const Home = ({ questions, darkMode }) => (
  <div>
    <Wrapper data={data}>
      <section>
        {/* <h1 className='f1 fw9'>Welcome to Clouty</h1> */}
        <h1 className='f1 f-subheadline-l db tc measure lh-title fw9 mv5'>
          The 🌎&apos;s first music betting platform.
        </h1>
        <div>
          <p className={`${styles.paragraph}`}>
            Every week, we host live bets about the latest releases and
            predictions in the rap game.{' '}
          </p>
          <p className={`${styles.paragraph}`}>
            Double your money while putting your intuition on the line.
          </p>
        </div>
        <section className='mt3 w-100 dib pv4 flex items-center justify-center '>
          <div className='b pa3 mr2  input-reset ba b--black bg-transparent grow pointer f4'>
            <Link href='/signup'>
              <a
                className={`no-underline ${classNames({
                  black: !darkMode,
                  white: darkMode,
                })}`}>
                Sign Up
              </a>
            </Link>
          </div>
          <div className='b pa3 mr2 input-reset ba bg-black b--black grow pointer f4'>
            {' '}
            <Link href='/learnmore'>
              <a className='no-underline white'>Learn More</a>
            </Link>
          </div>
        </section>
        <h2 className='f3 f-subheadline-l measure lh-title fw7'>
          Bets of the Week
        </h2>
        <section className='flex flex-wrap'>
          {questions
            .filter((game) => game.answer === '')
            .map((curr) => {
              return (
                <div className='pv2 pa2-ns w-100 w-50-ns' key={curr.question}>
                  <div
                    className={`white br2 shadow-4 pa3 pa4-ns h-100 grow ${curr.class}`}>
                    <h1 className='f4 mt0 fw7'>
                      <span role='img'>{curr.emoji}</span> Game #{curr.question}
                    </h1>
                    <p>{curr.description}</p>
                    <DemoForm game={curr} />
                  </div>
                </div>
              );
            })
            .reverse()
            .slice(0, 4)}
          {/* <div className='b pa3 mt3 mr2 input-reset ba fl bg-black b--black white grow pointer f4'>
            See More Games
          </div> */}
        </section>
        <article>
          <h2 className='f3 f-subheadline-l measure lh-title fw7'>
            New Releases
          </h2>
          <div className='cf pa2'>
            {albums.map((curr) => {
              return (
                <div className='fl w-50 w-25-m w-20-l pa2' key={curr.album}>
                  <a href={curr.spotify} className='db link dim tc'>
                    <img
                      src={curr.image}
                      className={`w-100 db outline ${classNames({
                        'black-10': !darkMode,
                        'white-10': darkMode,
                      })}`}
                    />
                    <dl className='mt2 f6 lh-copy'>
                      <dt className='clip'>Title</dt>
                      <dd
                        className={`ml0 ${classNames({
                          black: !darkMode,
                          white: darkMode,
                        })} truncate w-100`}>
                        {curr.album}
                      </dd>
                      <dt className='clip'>Artist</dt>
                      <dd
                        className={`ml0 ${classNames({
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

Home.getInitialProps = async ({ req }) => {
  const { origin } = absoluteUrl(req);
  const apiURL = `${origin}`;
  const res = await axios.get(`${apiURL}/api/questions`);
  const questions = res.data;
  const darkMode = getCookie('dark_mode', req) === 'true';
  return {
    questions,
    darkMode,
  };
};
Home.propTypes = {
  questions: PropTypes.array,
  darkMode: PropTypes.bool,
};
export default Home;
