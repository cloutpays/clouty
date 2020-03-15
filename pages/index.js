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
                  src='https://ssla.ulximg.com/image/750x750/cover/1584077338_165f8d2a6837010530db8217968bb1e4.jpg/72170d0cb246d618ac1549bbb1631bd1/1584077338_d76498d52286f7223a6b47f796224344.jpg'
                  alt='Kendrick Lamar untitled unmastered. Album Cover'
                  className='w-100 db outline black-10'
                />
                <dl className='mt2 f6 lh-copy'>
                  <dt className='clip'>Title</dt>
                  <dd className='ml0 black truncate w-100'>Sweet Action</dd>
                  <dt className='clip'>Artist</dt>
                  <dd className='ml0 gray truncate w-100'>Jack Harlow</dd>
                </dl>
              </a>
            </div>
            <div className='fl w-50 w-25-m w-20-l pa2'>
              <a
                href='https://geo.itunes.apple.com/us/album/99.9/id1092026376?at=1l3vqFJ&mt=1&app=music'
                className='db link dim tc'>
                <img
                  src='https://images.complex.com/complex/images/c_fill,dpr_auto,q_90,w_920/fl_lossy,pg_1/fv9exqwsgrwcymbd1btv/rich-the-kid'
                  alt='Kaytranada 99%'
                  className='w-100 db outline black-10'
                />
                <dl className='mt2 f6 lh-copy'>
                  <dt className='clip'>Title</dt>
                  <dd className='ml0 black truncate w-100'>Boss Man</dd>
                  <dt className='clip'>Artist</dt>
                  <dd className='ml0 gray truncate w-100'>Rich the Kid</dd>
                </dl>
              </a>
            </div>
            <div className='fl w-50 w-25-m w-20-l pa2'>
              <a
                href='https://geo.itunes.apple.com/us/album/aa/id1067924003?at=1l3vqFJ&mt=1&app=music'
                className='db link dim tc'>
                <img
                  src='https://images.complex.com/complex/images/c_fill,dpr_auto,q_90,w_920/fl_lossy,pg_1/sdxhbfaip2aklfvv40zx/blueface-find-the-beat-stream'
                  alt='Baauer Aa - Album Cover'
                  className='w-100 db outline black-10'
                />
                <dl className='mt2 f6 lh-copy'>
                  <dt className='clip'>Title</dt>
                  <dd className='ml0 black truncate w-100'>Find The Beat</dd>
                  <dt className='clip'>Artist</dt>
                  <dd className='ml0 gray truncate w-100'>Blueface</dd>
                </dl>
              </a>
            </div>
            <div className='fl w-50 w-25-m w-20-l pa2'>
              <a
                href='https://geo.itunes.apple.com/us/album/99-cents/id1054734475?at=1l3vqFJ&mt=1&app=music'
                className='db link dim tc'>
                <img
                  src='https://static.stereogum.com/uploads/2020/03/Jay-Electronica-A-Written-Testimony-1584129087-640x640.jpeg'
                  alt='Santigold 99 cents - Album cover'
                  className='w-100 db outline black-10'
                />
                <dl className='mt2 f6 lh-copy'>
                  <dt className='clip'>Title</dt>
                  <dd className='ml0 black truncate w-100'>
                    A Written Testimony
                  </dd>
                  <dt className='clip'>Artist</dt>
                  <dd className='ml0 gray truncate w-100'>Jay Electronica</dd>
                </dl>
              </a>
            </div>
            <div className='fl w-50 w-25-m w-20-l pa2'>
              <a
                href='https://geo.itunes.apple.com/us/album/a-moon-shaped-pool/id1111577743?at=1l3vqFJ&mt=1&app=music'
                className='db link dim tc'>
                <img
                  src='https://upload.wikimedia.org/wikipedia/en/thumb/1/13/Pop_Smoke_-_Meet_the_Woo_2.png/220px-Pop_Smoke_-_Meet_the_Woo_2.png'
                  alt='A Moon Shaped Pool - Album cover'
                  className='w-100 db outline black-10'
                />
                <dl className='mt2 f6 lh-copy'>
                  <dt className='clip'>Title</dt>
                  <dd className='ml0 black truncate w-100'>Meet the Woo 2</dd>
                  <dt className='clip'>Artist</dt>
                  <dd className='ml0 gray truncate w-100'>Pop Smoke</dd>
                </dl>
              </a>
            </div>
            <div className='fl w-50 w-25-m w-20-l pa2'>
              <a
                href='https://geo.itunes.apple.com/us/album/the-life-of-pablo/id1123231885?at=1l3vqFJ&mt=1&app=music'
                className='db link dim tc'>
                <img
                  src='https://images.genius.com/65fa2295b92218e5c10cbed945537758.1000x1000x1.jpg'
                  alt='The Life of Pablo - Album Cover'
                  className='w-100 db outline black-10'
                />
                <dl className='mt2 f6 lh-copy'>
                  <dt className='clip'>Title</dt>
                  <dd className='ml0 black truncate w-100'>Fuck The World</dd>
                  <dt className='clip'>Artist</dt>
                  <dd className='ml0 gray truncate w-100'>Brent Faiyaz</dd>
                </dl>
              </a>
            </div>
            <div className='fl w-50 w-25-m w-20-l pa2'>
              <a
                href='https://geo.itunes.apple.com/us/album/coloring-book/id1113239004?at=1l3vqFJ&mt=1&app=music'
                className='db link dim tc'>
                <img
                  src='https://media.pitchfork.com/photos/5e5d8aa3230d040009b1f403/1:1/w_600/PTSD_G%20Herbo.jpg'
                  alt='Coloring Book - Album cover'
                  className='w-100 db outline black-10'
                />
                <dl className='mt2 f6 lh-copy'>
                  <dt className='clip'>Title</dt>
                  <dd className='ml0 black truncate w-100'>PTSD</dd>
                  <dt className='clip'>Artist</dt>
                  <dd className='ml0 gray truncate w-100'>G Herbo</dd>
                </dl>
              </a>
            </div>
            <div className='fl w-50 w-25-m w-20-l pa2'>
              <a
                href='https://geo.itunes.apple.com/us/album/everybody-looking/id1135576036?at=1l3vqFJ&mt=1&app=music'
                className='db link dim tc'>
                <img
                  src='https://media.pitchfork.com/photos/5e56ce610e27b00008f7b845/1:1/w_320/My%20Turn_Lil%20Baby.jpg'
                  alt='Everybody Looking - Album Cover'
                  className='w-100 db outline black-10'
                />
                <dl className='mt2 f6 lh-copy'>
                  <dt className='clip'>Title</dt>
                  <dd className='ml0 black truncate w-100'>My Turn</dd>
                  <dt className='clip'>Artist</dt>
                  <dd className='ml0 gray truncate w-100'>Lil Baby</dd>
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
