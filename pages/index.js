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
          </p>
          <p className={`${styles.paragraph}`}>
            Double your money while putting your intuition on the line.
          </p>
        </div>
        <section className='mt3 w-100 dib pv4 flex items-center justify-center '>
          <div className='b pa3 mr2  input-reset ba b--black bg-transparent grow pointer f4'>
            Sign Up
          </div>
          <div className='b pa3 mr2 input-reset ba b--black bg-transparent grow pointer f4'>
            Learn More
          </div>
        </section>
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
        <article>
          <h2 className='f3 f-subheadline-l measure lh-title fw7'>
            New Releases
          </h2>
          <div className='cf pa2'>
            <div className='fl w-50 w-25-m w-20-l pa2'>
              <a
                href='https://geo.itunes.apple.com/us/album/blonde/id1146195596?at=1l3vqFJ&mt=1&app=music'
                className='db link dim tc'>
                <img
                  src='https://images.complex.com/complex/images/c_fill,dpr_auto,q_90,w_920/fl_lossy,pg_1/mhgdsrhn3a90ytkkkw3x/don-toliver-heaven-or-hell-stream'
                  alt='Frank Ocean Blonde Album Cover'
                  className='w-100 db outline black-10'
                />
                <dl className='mt2 f6 lh-copy'>
                  <dt className='clip'>Title</dt>
                  <dd className='ml0 black truncate w-100'>Heavon or Hell</dd>
                  <dt className='clip'>Artist</dt>
                  <dd className='ml0 gray truncate w-100'>Don Toliver</dd>
                </dl>
              </a>
            </div>
            <div className='fl w-50 w-25-m w-20-l pa2'>
              <a
                href='https://geo.itunes.apple.com/us/album/jeffery/id1146718343?at=1l3vqFJ&mt=1&app=music'
                className='db link dim tc'>
                <img
                  src='https://images.complex.com/complex/images/c_fill,dpr_auto,q_90,w_920/fl_lossy,pg_1/ebjrkgp7iu5fajw98mzn/lil-uzi-vert-eternal-atake-deluxe-stream'
                  alt='Young Thug - Jeffery Album Cover'
                  className='w-100 db outline black-10'
                />
                <dl className='mt2 f6 lh-copy'>
                  <dt className='clip'>Title</dt>
                  <dd className='ml0 black truncate w-100 ttu'>
                    Eternal Atake (Deluxe)
                  </dd>
                  <dt className='clip'>Artist</dt>
                  <dd className='ml0 gray truncate w-100'>Lil Uzi Vert</dd>
                </dl>
              </a>
            </div>
            <div className='fl w-50 w-25-m w-20-l pa2'>
              <a
                href='https://geo.itunes.apple.com/us/album/untitled-unmastered./id1089846273?at=1l3vqFJ&mt=1&app=music'
                className='db link dim tc'>
                <img
                  src='http://is5.mzstatic.com/image/thumb/Music49/v4/1b/36/43/1b3643c6-e6a3-41bc-7f6d-7c2b64b5d60b/source/400x40000bb.png'
                  alt='Kendrick Lamar untitled unmastered. Album Cover'
                  className='w-100 db outline black-10'
                />
                <dl className='mt2 f6 lh-copy'>
                  <dt className='clip'>Title</dt>
                  <dd className='ml0 black truncate w-100'>
                    untitled umastered.
                  </dd>
                  <dt className='clip'>Artist</dt>
                  <dd className='ml0 gray truncate w-100'>Kendrick Lamar</dd>
                </dl>
              </a>
            </div>
            <div className='fl w-50 w-25-m w-20-l pa2'>
              <a
                href='https://geo.itunes.apple.com/us/album/99.9/id1092026376?at=1l3vqFJ&mt=1&app=music'
                className='db link dim tc'>
                <img
                  src='http://is4.mzstatic.com/image/thumb/Music49/v4/e9/4c/2d/e94c2d5f-bdb0-c565-4cc2-f9dfcf7f0b87/source/400x40000bb.png'
                  alt='Kaytranada 99%'
                  className='w-100 db outline black-10'
                />
                <dl className='mt2 f6 lh-copy'>
                  <dt className='clip'>Title</dt>
                  <dd className='ml0 black truncate w-100'>99%</dd>
                  <dt className='clip'>Artist</dt>
                  <dd className='ml0 gray truncate w-100'>Kaytranada</dd>
                </dl>
              </a>
            </div>
            <div className='fl w-50 w-25-m w-20-l pa2'>
              <a
                href='https://geo.itunes.apple.com/us/album/aa/id1067924003?at=1l3vqFJ&mt=1&app=music'
                className='db link dim tc'>
                <img
                  src='http://is3.mzstatic.com/image/thumb/Music49/v4/b6/b0/a1/b6b0a1dd-998d-9786-ca2f-87470be15250/source/400x40000bb.png'
                  alt='Baauer Aa - Album Cover'
                  className='w-100 db outline black-10'
                />
                <dl className='mt2 f6 lh-copy'>
                  <dt className='clip'>Title</dt>
                  <dd className='ml0 black truncate w-100'>Aa</dd>
                  <dt className='clip'>Artist</dt>
                  <dd className='ml0 gray truncate w-100'>Baauer</dd>
                </dl>
              </a>
            </div>
            <div className='fl w-50 w-25-m w-20-l pa2'>
              <a
                href='https://geo.itunes.apple.com/us/album/99-cents/id1054734475?at=1l3vqFJ&mt=1&app=music'
                className='db link dim tc'>
                <img
                  src='http://is3.mzstatic.com/image/thumb/Music62/v4/fa/ae/a6/faaea65f-0819-bb5d-afaa-4f5e84015204/source/400x40000bb.png'
                  alt='Santigold 99 cents - Album cover'
                  className='w-100 db outline black-10'
                />
                <dl className='mt2 f6 lh-copy'>
                  <dt className='clip'>Title</dt>
                  <dd className='ml0 black truncate w-100'>99 cents</dd>
                  <dt className='clip'>Artist</dt>
                  <dd className='ml0 gray truncate w-100'>Santigold</dd>
                </dl>
              </a>
            </div>
            <div className='fl w-50 w-25-m w-20-l pa2'>
              <a
                href='https://geo.itunes.apple.com/us/album/a-moon-shaped-pool/id1111577743?at=1l3vqFJ&mt=1&app=music'
                className='db link dim tc'>
                <img
                  src='http://is2.mzstatic.com/image/thumb/Music18/v4/34/03/34/34033451-12e2-2d0b-c100-11a390922a01/source/400x40000bb.png'
                  alt='A Moon Shaped Pool - Album cover'
                  className='w-100 db outline black-10'
                />
                <dl className='mt2 f6 lh-copy'>
                  <dt className='clip'>Title</dt>
                  <dd className='ml0 black truncate w-100'>
                    A Moon Shaped Pool
                  </dd>
                  <dt className='clip'>Artist</dt>
                  <dd className='ml0 gray truncate w-100'>Radiohead</dd>
                </dl>
              </a>
            </div>
            <div className='fl w-50 w-25-m w-20-l pa2'>
              <a
                href='https://geo.itunes.apple.com/us/album/the-life-of-pablo/id1123231885?at=1l3vqFJ&mt=1&app=music'
                className='db link dim tc'>
                <img
                  src='http://is3.mzstatic.com/image/thumb/Music20/v4/c0/98/d0/c098d05b-7bcc-0ea3-0213-0f69992fda65/source/400x40000bb.png'
                  alt='The Life of Pablo - Album Cover'
                  className='w-100 db outline black-10'
                />
                <dl className='mt2 f6 lh-copy'>
                  <dt className='clip'>Title</dt>
                  <dd className='ml0 black truncate w-100'>
                    The Life of Pablo
                  </dd>
                  <dt className='clip'>Artist</dt>
                  <dd className='ml0 gray truncate w-100'>Kanye West</dd>
                </dl>
              </a>
            </div>
            <div className='fl w-50 w-25-m w-20-l pa2'>
              <a
                href='https://geo.itunes.apple.com/us/album/coloring-book/id1113239004?at=1l3vqFJ&mt=1&app=music'
                className='db link dim tc'>
                <img
                  src='http://is2.mzstatic.com/image/thumb/Music18/v4/5a/42/0f/5a420f73-6490-abc9-bdcc-3001d5c4e9fc/source/400x40000bb.png'
                  alt='Coloring Book - Album cover'
                  className='w-100 db outline black-10'
                />
                <dl className='mt2 f6 lh-copy'>
                  <dt className='clip'>Title</dt>
                  <dd className='ml0 black truncate w-100'>Coloring Book</dd>
                  <dt className='clip'>Artist</dt>
                  <dd className='ml0 gray truncate w-100'>Chance the Rapper</dd>
                </dl>
              </a>
            </div>
            <div className='fl w-50 w-25-m w-20-l pa2'>
              <a
                href='https://geo.itunes.apple.com/us/album/everybody-looking/id1135576036?at=1l3vqFJ&mt=1&app=music'
                className='db link dim tc'>
                <img
                  src='http://is4.mzstatic.com/image/thumb/Music30/v4/9b/2e/e1/9b2ee13e-35fd-0cc1-d203-e65b4beafc7f/source/400x40000bb.png'
                  alt='Everybody Looking - Album Cover'
                  className='w-100 db outline black-10'
                />
                <dl className='mt2 f6 lh-copy'>
                  <dt className='clip'>Title</dt>
                  <dd className='ml0 black truncate w-100'>
                    Everybody Looking
                  </dd>
                  <dt className='clip'>Artist</dt>
                  <dd className='ml0 gray truncate w-100'>Gucci Mane</dd>
                </dl>
              </a>
            </div>
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
  return {
    questions: questions.filter((game) => game.gameType === 'game'),
  };
};
Home.propTypes = {
  questions: PropTypes.array,
};
export default Home;
