import { grammyRender } from '../lib/helpers';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import Wrapper from '../components/Wrapper';
import absoluteUrl from 'next-absolute-url';
import axios from 'axios';

const Grammys = ({ questions }) => {
  const data = {
    title: '🏆 2020 Grammys 🏆',
    header: '🏆 2020 Grammys 🏆',
    description: 'Selected games and contests.',
  };
  return (
    <Wrapper data={data}>
      <section className='flex flex-wrap'>
        <div className='mb2'>
          This is our first Live Event Gaming section. Here we will announce
          winners and disperse earnings in real time. Tune in and place your bet
          before winners are announced.{' '}
          <p>
            <strong>Last day to play is Jan 26th 6pm CST.</strong>
          </p>
        </div>
        {questions.map((game) => {
          const gameButtonText = !game.answer ? 'Play Game' : 'See Results';
          const activeLink = `/games/${game.slug}`;
          const cardClass = `white br2 shadow-4 pa3 pa4-ns h-100 grow ${game.class}`;
          return (
            <div key={`work-${game.name}`} className='pv2 pa2-ns w-100 w-50-ns'>
              <Link href={activeLink}>
                <a href={activeLink} className='no-underline white'>
                  <div className={cardClass}>
                    <h1 className='f4 mt0 fw7'>
                      <span role='img' aria-label={game.emoji_name}>
                        {game.emoji}
                      </span>{' '}
                      {`${game.question}`}
                    </h1>
                    {grammyRender(game)}
                    {game.answer && (
                      <>
                        <div className='f5 mt0 fw7'>
                          <span className='bg-white-30 mr2 pv1 ph2 f7 f6-ns br-pill b'>
                            Winning bet
                            <span className='pl1  sans-serif'>→</span>
                          </span>
                          {game.answer}
                        </div>
                      </>
                    )}
                    {!game.answer && (
                      <span className='bg-white-30 pv1 ph2 f7 f6-ns br-pill b'>
                        {gameButtonText}
                        <span className='pl1 sans-serif'>→</span>
                      </span>
                    )}

                    {/* <span className='bg-white-30 fr pv1 ph2 f7 f6-ns br-pill b'>
                        {`Ends 01/26`}
                      </span> */}
                  </div>
                </a>
              </Link>
            </div>
          );
        })}
      </section>
    </Wrapper>
  );
};

Grammys.getInitialProps = async ({ req }) => {
  const { origin } = absoluteUrl(req);
  const apiURL = `${origin}`;
  const res = await axios.get(`${apiURL}/api/questions`);
  const questions = res.data;
  return { questions: questions.filter((game) => game.gameType === 'grammy') };
};

Grammys.propTypes = {
  questions: PropTypes.array,
};

export default Grammys;
