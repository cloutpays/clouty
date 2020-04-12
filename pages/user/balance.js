import { getCookie } from '../../lib/session';
// import CardSection from '../../components/checkout/CardSection';
// import Head from 'next/head';
import { styles } from '../../constants/styles';
import PropTypes from 'prop-types';
import React from 'react';
import SecuredPage from '../../hoc/securedPage';
import Wrapper from '../../components/layout/Wrapper';
import absoluteUrl from 'next-absolute-url';
import axios from 'axios';

const Terms = () => {
  // const { user } = ctx;
  const data = {
    description: 'Make money while putting your intuition on the line.',
  };
  return (
    <>
      {/* <Head>
        <script src='https://js.stripe.com/v3/'></script>
      </Head> */}
      <Wrapper data={data}>
        <main className='black-80'>
          {/* <UserDashNavigation /> */}
          <div className='mw8 center pv3 ph3' id='dashboard'>
            <h3 className='f2 pt0 mw3 db tc measure lh-title fw9 mv5 mh2'>
              Sorry, we&apos;re currently troubleshooting some bugs on the
              card-processing side of things.
            </h3>
            <img
              className='center db pb3 w-50-ns w-70'
              src='https://media.giphy.com/media/l2Sq3Ezdhj0DB2D6g/giphy.gif'
            />
            <p className={`${styles.paragraph}`}>
              In the meantime, we&apos;re currently offering payments via{' '}
              <span className='b'>Cash App</span>,
              <span className='b'>Venmo</span> or{' '}
              <span className='b'>Paypal</span>. If interested shoot us an email
              at{' '}
              <a className='gray b' href='mailto:info@clouty.io'>
                info@clouty.io
              </a>
            </p>
            {/* <section className='flex-m flex-l nl3-m nr3-m nl3-l nr3-l'>
              <article className='w-100 w-75-l ph3-m ph3-l'>
                <CardSection user={user} />
              </article>
            </section> */}
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
