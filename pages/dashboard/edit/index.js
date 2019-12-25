import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import Wrapper from '../../../components/Wrapper';
import absoluteUrl from 'next-absolute-url';
import axios from 'axios';

const Games = ({ questions }) => {
  const data = {
    title: 'Edit',
    header: 'Edit games and contests.',
    description: 'Edit games and contests.',
  };
  return (
    <Wrapper data={data}>
      <section className='flex flex-wrap'>
        {questions
          .map((game) => {
            const gameButtonText = 'Edit Game';
            const activeLink = `/dashboard/edit/${game.slug}`;
            const cardClass = `white br2 shadow-4 pa3 pa4-ns h-100 grow ${game.class}`;
            return (
              <div
                key={`work-${game.name}`}
                className='pv2 pa2-ns w-100 w-50-ns'>
                <Link href={activeLink}>
                  <a href={activeLink} className='no-underline white'>
                    <div className={cardClass}>
                      <h1 className='f4 mt0 fw7'>
                        <span role='img' aria-label={game.emoji_name}>
                          {game.emoji}
                        </span>{' '}
                        {`Game #${game.question}`}
                      </h1>
                      <p>{game.description}</p>
                      <span className='bg-white-30 pv1 ph2 f7 f6-ns br-pill b'>
                        {gameButtonText}
                        <span className='pl1 sans-serif'>→</span>
                      </span>
                    </div>
                  </a>
                </Link>
              </div>
            );
          })
          .reverse()}

        <div key='contact' className='pv2 pa2-ns w-100 w-50-ns'>
          <a href='mailto:umeh@clouty.io' className='no-underline'>
            <div className='white br2 shadow-4 grow pa3 pa4-ns h-100 contact-card'>
              <h1 className='f4 mt0 fw7'>
                <span role='img' aria-label='User Submission'>
                  🗳
                </span>{' '}
                Want to submit a bet?
              </h1>
              <p>If it&apos;s good, we will add it to our weekly games.</p>
              <p>Sound good?</p>
              <span className='bg-white-30 pv1 ph2 f7 f6-ns br-pill b'>
                Get in touch<span className='pl1 sans-serif'>→</span>
              </span>
            </div>
          </a>
        </div>
      </section>
    </Wrapper>
  );
};

Games.getInitialProps = async ({ req }) => {
  const { origin } = absoluteUrl(req);
  const apiURL = `${origin}`;
  const res = await axios.get(`${apiURL}/api/questions`);
  const questions = res.data;
  return { questions };
};
Games.propTypes = {
  questions: PropTypes.array,
};

export default Games;
