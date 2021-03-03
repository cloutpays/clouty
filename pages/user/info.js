import { getCookie } from '../../lib/session';
import { instance } from '../../lib/helpers';
import PropTypes from 'prop-types';
import React from 'react';
import SecuredPage from '../../hoc/securedPage';
import UserInfoForm from '../../components/forms/UserInfoForm';
import Wrapper from '../../components/layout/Wrapper';
import absoluteUrl from 'next-absolute-url';

const Terms = (ctx) => {
  const { user } = ctx;
  const data = {
    description: 'Make money while putting your intuition on the line.',
    header: `User Profile`,
  };

  return (
    <Wrapper data={data} user={user} className='measure-wide'>
      <main>
        <div className='mw8 center pv4 ph3' id='dashboard'>
          <section className='flex-m flex-l nl3-m nr3-m nl3-l nr3-l'>
            <article className='w-100 w-75-m w-75-l ph3-m ph3-l'>
              <div className='flex-m flex-l flex-wrap items-center justify-between nl3 nr3 pt4 mb4'>
                <UserInfoForm user={user} />
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
  const userRes = await instance.get(`${apiURL}/api/user/${user}`);
  const userObj = userRes.data;
  return { userId: userRes._id, user: userObj };
};

Terms.propTypes = {
  submissions: PropTypes.array,
  questions: PropTypes.array,
};
export default SecuredPage(Terms);
