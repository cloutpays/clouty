import { getCookie } from '../../lib/session';
import PropTypes from 'prop-types';
import React from 'react';
import SecuredPage from '../../hoc/securedPage';
import UserDashNavigation from '../../components/UserDashNavigation';
import UserInfoForm from '../../components/UserInfoForm';
import Wrapper from '../../components/Wrapper';
import absoluteUrl from 'next-absolute-url';
import axios from 'axios';

const data = {
  description: 'Make money while putting your intuition on the line.',
  header: 'Welcome, Breemz!',
};
const Terms = () => {
  return (
    <Wrapper data={data} className='measure-wide'>
      <main>
        <UserDashNavigation />
        <div className='mw8 center pv4 ph3' id='dashboard'>
          <section className='flex-m flex-l nl3-m nr3-m nl3-l nr3-l'>
            <article className='w-100 w-75-m w-75-l ph3-m ph3-l'>
              <div className='flex-m flex-l flex-wrap items-center justify-between nl3 nr3 pt4 mb4'>
                <UserInfoForm />
              </div>
            </article>
          </section>
        </div>
      </main>
    </Wrapper>
  );
};
Terms.getInitialProps = async (ctx) => {
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

Terms.propTypes = {
  submissions: PropTypes.array,
  questions: PropTypes.array,
};
export default SecuredPage(Terms);
