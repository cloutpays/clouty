import { formatDate, formatPrice } from '../../../lib/helpers';
import { getCookie } from '../../../lib/session';
import AdminPage from '../../../hoc/adminPage';
import CreateGameForm from '../../../components/forms/CreateGameForm';
import PropTypes from 'prop-types';
import React from 'react';
import Wrapper from '../../../components/layout/Wrapper';
import absoluteUrl from 'next-absolute-url';
import axios from 'axios';

const Games = ({ game, questions, submissions, houseBalance, userId }) => {
  const data = {
    title: 'Edit Game',
    header: 'Edit Game',
    description: 'Selected games and contests.',
  };

  return (
    <Wrapper data={data}>
      <CreateGameForm questions={questions} game={game} userId={userId} />
      <div className='mv3'>
        <h2>Submissions</h2>

        <table className='f6 w-100 mw8 center' cellSpacing='0'>
          <thead>
            <tr>
              <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'> Date</th>
              <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>Name</th>
              <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>Game #</th>
              <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>Answer</th>
              <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>
                <div>
                  <span>Wager</span>
                </div>
              </th>
              <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>
                {' '}
                Result
              </th>
            </tr>
          </thead>
          <tbody className='lh-copy'>
            {submissions

              .map((curr, ind) => {
                return (
                  <tr key={ind}>
                    <td className='pv3 pr3 bb b--black-20' key='date'>
                      {formatDate(new Date(curr.date || '2019-11-30'))}
                    </td>
                    <td className='pv3 pr3 bb b--black-20' key='name'>
                      <a
                        className='no-underline dim black b'
                        href={`/dashboard/manage/${curr.userId}`}>
                        {' '}
                        @{curr.handle}
                      </a>
                    </td>
                    <td className='pv3 pr3 bb b--black-20' key='question'>
                      {curr.question}
                    </td>
                    <td className='pv3 pr3 bb b--black-20' key='answer'>
                      {curr.answer}
                    </td>
                    <td
                      className='pv3 pr3 bb b--black-20'
                      key='wager'>{`$${curr.wager}`}</td>
                    <td className='pv3 pr3 bb b--black-20' key='paid'>
                      {typeof curr.won === 'undefined' ? (
                        <span className='bg-gold ph1 mt2 fw8 f5 white'>P</span>
                      ) : curr.won ? (
                        <span className='bg-green ph1 mt2 fw8 f5 white'>W</span>
                      ) : (
                        <span className='bg-red ph1 mt2 fw8 f5 white'>L</span>
                      )}
                    </td>
                  </tr>
                );
              })
              .reverse()}
          </tbody>
        </table>
        <div className='dtc f4 b ma0 v-mid w-100 w-90-ns tr'>
          Total Wagers: {submissions.length}
        </div>
        <div className='dtc f4 b ma0 v-mid w-100 w-90-ns tr'>
          Total Pot: {formatPrice(houseBalance)}
        </div>
      </div>
    </Wrapper>
  );
};

Games.getInitialProps = async ({ query, req }) => {
  const { game } = query;
  const { origin } = absoluteUrl(req);
  const apiURL = `${origin}`;
  const question = await (await axios.get(`${apiURL}/api/question/${game}`))
    .data;
  const questions = await (await axios.get(`${apiURL}/api/questions`)).data;
  const submissionsRes = await axios.get(
    `${apiURL}/api/gameSubmissions/${game}`,
  );
  const submissions = submissionsRes.data;
  const userId = getCookie('id_token', req);
  const houseBalance = submissions.reduce((acc, curr) => {
    return acc + curr.wager;
  }, 0);
  return { game: question[0], questions, submissions, userId, houseBalance };
};

Games.propTypes = {
  game: PropTypes.object,
  games: PropTypes.array,
  questions: PropTypes.array,
  submissions: PropTypes.array,
  userId: PropTypes.string,
  houseBalance: PropTypes.number,
};

export default AdminPage(Games);
