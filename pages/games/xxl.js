import { XXLForm } from '../../components/forms/XXLForm';
import { formatPrice } from '../../lib/helpers';
import { getCookie } from '../../lib/session';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import SecuredPage from '../../hoc/securedPage';
import Wrapper from '../../components/layout/Wrapper';
import absoluteUrl from 'next-absolute-url';
import axios from 'axios';

const Games = ({ user }) => {
  const data = {
    header: `XXL Freshmen '20`,
    description: 'Selected games and contests.',
  };

  return (
    <Wrapper data={data}>
      <section className='flex flex-wrap'>
        <div className='dtc f6 b ma0 v-mid w-100 w-90-ns tr'>
          Current Balance: {formatPrice(user.stripe.user.balance / 100)}
        </div>
        <div className='dtc f6 b ma0 v-mid w-100 w-90-ns tr'>
          <div className='noselect grow outline dim pv2 ph3 mr2 fr mt2'>
            <Link href='/user/balance'>
              <strong>ADD TO BALANCE</strong>
            </Link>
          </div>
        </div>
        <div className='pv2 pa2-ns w-100 center w-80-ns'>
          <a className='no-underline white'>
            <div className={`white br2 shadow-4 pa3 pa4-ns h-100 xxl`}>
              <XXLForm />
            </div>
          </a>
        </div>
      </section>
    </Wrapper>
  );
};

Games.getInitialProps = async (ctx) => {
  const {
    query: { game },
    req,
  } = ctx;
  const { origin: apiURL } = absoluteUrl(req);
  const { data: question } = await axios.get(`${apiURL}/api/question/${game}`);
  const userID = getCookie('id_token', ctx.req);
  const { data: user } = await axios.get(`${apiURL}/api/user/${userID}`);
  return {
    game: question[0],
    user,
  };
};

Games.propTypes = {
  games: PropTypes.array,
  game: PropTypes.object,
  user: PropTypes.object,
};

export default SecuredPage(Games);
