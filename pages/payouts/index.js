import { formatDate } from '../../lib/helpers';
import { getCookie } from '../../lib/session';
import PropTypes from 'prop-types';
import React from 'react';
import SecuredPage from '../../hoc/securedPage';
import UserDashNavigation from '../../components/layout/UserDashNavigation';
import Wrapper from '../../components/layout/Wrapper';
import absoluteUrl from 'next-absolute-url';
import axios from 'axios';

const Terms = ({ balance, payouts, user }) => {
  const data = {
    description: 'Make money while putting your intuition on the line.',
    header: `Welcome, ${user.info.firstName}!`,
  };
  return (
    <Wrapper data={data} user={user} className='measure-wide'>
      <main>
        <UserDashNavigation balance={balance} user={user} />
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
                        {payouts.length === 0 && (
                          <article>
                            <div className='link dt w-100 bb b--black-10 pa3 dim blue'>
                              <div className='dtc v-top' key='no'>
                                <h1 className='f6 f5-ns fw6 lh-title black mv0 pa4 center '>
                                  No Payouts Yet 💸{' '}
                                </h1>
                              </div>
                            </div>
                          </article>
                        )}
                        {payouts
                          .map((game, ind) => {
                            let methodOfPayment = game.preferred;
                            return (
                              <article key={ind}>
                                <div className='link dt w-100 bb b--black-10 pa3 dim blue'>
                                  <div className='dtc v-top' key={ind}>
                                    <h1 className='f6 f5-ns fw6 lh-title black mv0'>
                                      {methodOfPayment} Deposit - ${game.amount}
                                    </h1>
                                    <div className='f5 fw4 pt1 black-60'>
                                      {formatDate(new Date(game.date))}
                                    </div>
                                    <div>
                                      {!game.cleared && (
                                        <span className='bg-yellow pa1 mt2 fw8 f5 white'>
                                          Processing
                                        </span>
                                      )}
                                      {game.cleared && (
                                        <span className='bg-green pa1 mt2 fw8 f5 white'>
                                          Cleared
                                        </span>
                                      )}
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
                    href='/payouts/setup'
                    className='no-underline fw5 mt3 br2 ph3 pv2 dib ba b--blue blue bg-white hover-bg-blue hover-white'>
                    Setup a Payout
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
  const payoutsRes = await axios.get(`${apiURL}/api/userPayouts/${user}`);
  const payouts = payoutsRes.data;
  const userRes = await axios.get(`${apiURL}/api/user/${user}`);
  const userObj = userRes.data;

  return {
    balance: userObj?.stripe?.user?.balance ?? 0,
    user: userObj,
    payouts,
  };
};

Terms.propTypes = {
  balance: PropTypes.number,
  payouts: PropTypes.array,
  user: PropTypes.object,
};
export default SecuredPage(Terms);
