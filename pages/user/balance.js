import { getCookie } from '../../lib/session';
import { instance } from '../../lib/helpers';
import CardSection from '../../components/checkout/CardSection';
import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';
import SecuredPage from '../../hoc/securedPage';
import UserDashNavigation from '../../components/layout/UserDashNavigation';
import Wrapper from '../../components/layout/Wrapper';
import absoluteUrl from 'next-absolute-url';

const Terms = (ctx) => {
  const { user } = ctx;
  const data = {
    description: 'Make money while putting your intuition on the line.',
    header: `Add to Balance`,
  };
  return (
    <>
      <Head>
        <script src='https://js.stripe.com/v3/'></script>
      </Head>
      <Wrapper data={data} className='measure-wide'>
        <main className='black-80'>
          <UserDashNavigation user={user} />
          <div className='mw8 center pb2 ph3' id='dashboard'>
            <article className='pl3-ns mt2 pt1'>
              <div className='mr5 pr2 pr5-ns'>
                <h2 className='ttu mt0 mb1 f6 fw5 silver'>Select Amount</h2>
              </div>
            </article>
            <section className='flex-m flex-l nl3-m nr3-m nl3-l nr3-l'>
              <article className='w-100 w-75-l ph3-m ph3-l'>
                <CardSection user={user} />
              </article>
            </section>
          </div>
        </main>
      </Wrapper>
    </>
  );
};
Terms.getInitialProps = async (ctx) => {
  const { origin } = absoluteUrl(ctx.req);
  const apiURL = `${origin}`;
  const user = getCookie('id_token', ctx.req);
  const userRes = await instance.get(`${apiURL}/api/user/${user}`);
  const userObj = userRes.data;
  return { userId: userRes._id, user: userObj };
};

Terms.propTypes = {
  submissions: PropTypes.array,
  sessionId: PropTypes.string,
};
export default SecuredPage(Terms);
