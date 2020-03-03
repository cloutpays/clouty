import { getCookie } from '../../lib/session';
import PropTypes from 'prop-types';
import React from 'react';
import SecuredPage from '../../hoc/securedPage';
import UserDashNavigation from '../../components/UserDashNavigation';
import Wrapper from '../../components/Wrapper';
import absoluteUrl from 'next-absolute-url';
import axios from 'axios';

const Terms = ({ submissions, user }) => {
  const data = {
    description: 'Make money while putting your intuition on the line.',
    header: `Welcome, ${user.info.firstName}!`,
  };
  return (
    <Wrapper data={data} user={user} className='measure-wide'>
      <main>
        <UserDashNavigation user={user} />
        <div className='mw8 center ph3' id='dashboard'>
          <section className='flex-m flex-l nl3-m nr3-m nl3-l nr3-l'>
            <article className='w-100 w-75-m  ph3-m ph3-l'>
              <div className='flex-m flex-l flex-wrap items-center justify-between nl3 nr3 pt1 mb4'>
                <div className='w-100 ph1 mb3 mb0-l'>
                  <div className='bt bl br b--black-10 br2'>
                    <div className='pa3 bb b--black-10'>
                      <h4 className='mv0'>Payouts</h4>
                    </div>
                    <ul className='list pl0 mt0 measure center'>
                      <main className=' center'>
                        {submissions.length > 0 &&
                          submissions
                            .map((game, ind) => {
                              return (
                                <article key={ind}>
                                  <div className='link dt w-100 bb b--black-10 pa3 dim blue'>
                                    <div className='dtc v-top' key={ind}>
                                      <h1 className='f6 f5-ns fw6 lh-title black mv0'>
                                        Cash App Deposit - $25
                                      </h1>
                                      <div className='f5 fw4 pt1 black-60'>
                                        2/19/2020
                                      </div>
                                      <div>
                                        <span className='bg-green pa1 mt2 fw8 f5 white'>
                                          Processing
                                        </span>
                                        {/* <span className='f5 fw5 ml1 silver'>
                                          Cash App
                                        </span> */}
                                      </div>
                                    </div>
                                  </div>
                                </article>
                              );
                            })
                            .reverse()}
                      </main>
                    </ul>
                  </div>
                  <a
                    href='/settings/payouts'
                    className='no-underline fw5 mt3 br2 ph3 pv2 dib ba b--blue blue bg-white hover-bg-blue hover-white'>
                    Setup Payouts
                  </a>
                </div>
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
  const userRes = await axios.get(`${apiURL}/api/user/${user}`);
  const userObj = userRes.data;
  const submissions = submissionsRes.data.map((sub) => {
    return {
      ...sub,
      question: questions.filter((question) => {
        return sub.question === question.question;
      })[0],
    };
  });

  return { submissions, questions, user: userObj };
};

Terms.propTypes = {
  submissions: PropTypes.array,
  questions: PropTypes.array,
  user: PropTypes.object,
};
export default SecuredPage(Terms);
