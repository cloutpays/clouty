import { getCookie } from '../../lib/session';
import { instance } from '../../lib/helpers';
import PayoutForm from '../../components/forms/PayoutForm';
import PropTypes from 'prop-types';
import React from 'react';
import SecuredPage from '../../hoc/securedPage';
import UserDashNavigation from '../../components/layout/UserDashNavigation';
import Wrapper from '../../components/layout/Wrapper';
import absoluteUrl from 'next-absolute-url';

const PayoutSettings = ({ user, submissions }) => {
  const data = {
    description: 'Make money while putting your intuition on the line.',
    header: `Welcome, ${user.info.firstName}!`,
  };
  return (
    <Wrapper data={data} user={user}>
      <main>
        <UserDashNavigation user={user} />
        <div className='mw8 center ph3' id='dashboard'>
          <section className='flex-m flex-l nl3-m nr3-m nl3-l nr3-l'>
            <article className='w-100 w-75-m  ph3-m ph3-l'>
              <div className='flex-m flex-l flex-wrap items-center justify-between nl3 nr3 pt1 mb4'>
                <div className='w-100 ph1 mb3 mb0-l'>
                  <div className='bt bl br b--black-10 br2'>
                    <div className='pa3 bb b--black-10'>
                      <h4 className='mv0'>Setup Payouts</h4>
                    </div>

                    <main className='b--black-10 bb center'>
                      <main className='pa4 black-80'>
                        <div className='f5'>
                          Please select your preferred payout method.
                        </div>
                        <PayoutForm submissions={submissions} user={user} />
                      </main>
                    </main>
                  </div>
                </div>
              </div>
            </article>
          </section>
        </div>
      </main>
    </Wrapper>
  );
};
PayoutSettings.getInitialProps = async (ctx) => {
  const { origin } = absoluteUrl(ctx.req);
  const apiURL = `${origin}`;
  const user = getCookie('id_token', ctx.req);

  const userRes = await instance.get(`${apiURL}/api/user/${user}`);
  const userObj = userRes.data;
  const submissionsRes = await instance.get(
    `${apiURL}/api/userSubmissions/${user}`,
  );
  const submissions = submissionsRes.data;
  return { user: userObj, submissions };
};

PayoutSettings.propTypes = {
  submissions: PropTypes.array,
  questions: PropTypes.array,
  user: PropTypes.object,
};
export default SecuredPage(PayoutSettings);
