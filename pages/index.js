import { styles } from '../constants/styles';
import DemoForm from '../components/DemoForm';
import Link from 'next/link';
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
              <a className='no-underline black'>Sign Up</a>
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
        </section>
        <article>
          <h2 className='f3 f-subheadline-l measure lh-title fw7'>
            New Releases
          </h2>
          <div className='cf pa2'>
            <div className='fl w-50 w-25-m w-20-l pa2'>
              <a
                href='https://open.spotify.com/album/7z4GhRfLqfSkqrj5F3Yt2B'
                className='db link dim tc'>
                <img
                  src='https://images.complex.com/complex/images/c_fill,dpr_auto,q_90,w_920/fl_lossy,pg_1/mhgdsrhn3a90ytkkkw3x/don-toliver-heaven-or-hell-stream'
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
                href='https://open.spotify.com/album/0fEO7g2c5onkaXsybEtuD2'
                className='db link dim tc'>
                <img
                  src='https://images.complex.com/complex/images/c_fill,dpr_auto,q_90,w_920/fl_lossy,pg_1/ebjrkgp7iu5fajw98mzn/lil-uzi-vert-eternal-atake-deluxe-stream'
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
                href='https://open.spotify.com/album/7AaqMMiYMvnMB3RcS8u3EY'
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
                href='https://open.spotify.com/album/1YOx6ZVgiv9GEluUwBWevi'
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
                href='https://open.spotify.com/album/2BLEkA5FiMxrp1ldVn4Ajqc'
                className='db link dim tc'>
                <img
                  src='https://images.complex.com/complex/images/c_fill,dpr_auto,q_90,w_920/fl_lossy,pg_1/sdxhbfaip2aklfvv40zx/blueface-find-the-beat-stream'
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
                href='https://open.spotify.com/album/0ZJt4dCoI19u71k37E1nQu'
                className='db link dim tc'>
                <img
                  src='https://static.stereogum.com/uploads/2020/03/Jay-Electronica-A-Written-Testimony-1584129087-640x640.jpeg'
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
                href='https://open.spotify.com/album/4MZnolldq7ciKKlbVDzLm5'
                className='db link dim tc'>
                <img
                  src='https://upload.wikimedia.org/wikipedia/en/thumb/1/13/Pop_Smoke_-_Meet_the_Woo_2.png/220px-Pop_Smoke_-_Meet_the_Woo_2.png'
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
                href='https://open.spotify.com/album/3vi20DRHkqv4HyVg9Rt9wC'
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
                href='https://open.spotify.com/album/0jH6iWykjOuyW7Y8zNKMBkc'
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
                href='https://open.spotify.com/album/1ynyQdPQiXdYJNQEDL1S3d'
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
    questions,
  };
};
Home.propTypes = {
  questions: PropTypes.array,
};
export default Home;
