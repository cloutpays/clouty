import { getCookie } from '../../lib/session';
import CardSection from '../../components/CardSection';
import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';
import SecuredPage from '../../hoc/securedPage';
import Wrapper from '../../components/Wrapper';
import absoluteUrl from 'next-absolute-url';
import axios from 'axios';

const data = {
  description: 'Make money while putting your intuition on the line.',
  header: 'Welcome, Breemz!',
};
const Terms = (ctx) => {
  const { user } = ctx;
  return (
    <>
      <Head>
        <script src='https://js.stripe.com/v3/'></script>
      </Head>
      <Wrapper data={data} className='measure-wide'>
        <main className='black-80'>
          {/* <UserDashNavigation /> */}
          <div className='mw8 center pv3 ph3' id='dashboard'>
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
  const userRes = await axios.get(`${apiURL}/api/user/${user}`);
  const userObj = userRes.data;
  return { userId: userRes._id, user: userObj };
};

Terms.propTypes = {
  submissions: PropTypes.array,
  sessionId: PropTypes.string,
};
export default SecuredPage(Terms);
