import { getCookie } from '../../lib/session';
import { instance } from '../../lib/helpers';
import PasswordResetForm from '../../components/forms/PasswordResetForm';
import PropTypes from 'prop-types';
import React from 'react';
import Wrapper from '../../components/layout/Wrapper';
import absoluteUrl from 'next-absolute-url';

const PwForget = ({ email }) => {
  const data = {
    description: 'Reset your password.',
    header: `Reset Password`,
  };

  return (
    <Wrapper data={data}>
      <PasswordResetForm email={email} />
    </Wrapper>
  );
};

PwForget.getInitialProps = async ({ req }) => {
  const { origin: apiURL } = absoluteUrl(req);
  const userID = getCookie('id_token', req);
  const { data: user } = await instance.get(`${apiURL}/api/user/${userID}`);
  return { email: user?.firebase?.email ?? '', user };
};

PwForget.propTypes = {
  email: PropTypes.string,
};

export default PwForget;
