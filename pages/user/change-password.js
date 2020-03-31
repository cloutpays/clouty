import PasswordChangeForm from '../../components/forms/PasswordChangeForm';
import React from 'react';
import Wrapper from '../../components/layout/Wrapper';

const ChangePassword = () => {
  const data = {
    description: 'Change your password.',
    header: `Change Password`,
  };

  return (
    <Wrapper data={data}>
      <PasswordChangeForm />
    </Wrapper>
  );
};

export default ChangePassword;
