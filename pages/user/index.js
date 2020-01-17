import { getCookie } from '../../lib/session';
import { styles } from '../../constants/styles';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import SecuredPage from '../../hoc/securedPage';
import Wrapper from '../../components/Wrapper';
import absoluteUrl from 'next-absolute-url';
import axios from 'axios';

const data = {
  description: 'Make money while putting your intuition on the line.',
  header: `The 🌎's first music betting platform.`,
};
const User = ({ submissions }) => {
  console.log(submissions);
  return (
    <div>
      <Wrapper data={data} className='measure-wide'>
        <h3 className={`${styles.paragraph}`}> Current Games:</h3>
        {submissions
          .map((game) => {
            const gameButtonText = !game.question.answer
              ? 'Pending'
              : game.question.answer === game.answer
              ? 'Won'
              : 'Lost';
            const activeLink = `/games/${game.slug}`;
            const cardClass = `white br2 shadow-4 pa3 pa4-ns h-100 grow grammy`;
            return (
              <div
                key={`work-${game.question.slug}`}
                className='pv2 pa2-ns w-100 w-50-ns'>
                <Link href={activeLink}>
                  <a href={activeLink} className='no-underline white'>
                    <div className={cardClass}>
                      <h1 className='f4 mt0 fw7'>
                        <span role='img' aria-label={game.question.emoji_name}>
                          {game.question.emoji}
                        </span>{' '}
                        {`Game #${game.question.question}`}
                      </h1>
                      {game.question.description}
                      <p>{`Wager: $${game.wager}`}</p>
                      <p>{`Submission: ${game.answer}`}</p>
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
      </Wrapper>
    </div>
  );
};

User.getInitialProps = async (ctx) => {
  const { origin } = absoluteUrl(ctx.req);
  const apiURL = `${origin}`;
  const user = getCookie('id_token', ctx.req);
  const submissionsRes = await axios.get(
    `${apiURL}/api/userSubmissions/${user}`,
  );
  const questionsRes = await axios.get(`${apiURL}/api/questions`);
  const questions = questionsRes.data;
  const submissions = submissionsRes.data.map((sub) => {
    return {
      ...sub,
      question: questions.filter((question) => {
        return sub.question === question.question;
      })[0],
    };
  });

  return { submissions, questions };
};

User.propTypes = {
  submissions: PropTypes.array,
  questions: PropTypes.array,
};
export default SecuredPage(User);
