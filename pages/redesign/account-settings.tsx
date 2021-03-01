import axios from 'axios';
import { GetServerSideProps } from 'next';
import absoluteUrl from 'next-absolute-url';
import React, { useState } from 'react';
import BigHeader from '../../components/redesign/BigHeader';
import Button from '../../components/redesign/Button';
import ModalBackground from '../../components/redesign/ModalBackground';
import PageWrapper from '../../components/redesign/PageWrapper';
import TextInput from '../../components/redesign/TextInput';
import { getCookie } from '../../lib/session';

interface IProps {
  user: any;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { origin } = absoluteUrl(ctx.req);
  const apiURL = `${origin}`;
  const user = getCookie('id_token', ctx.req);

  if (!user) {
    // Redirect logged out users to login page
    ctx.res.setHeader('Location', '/login');
    ctx.res.statusCode = 302;
    ctx.res.end();
  }

  const userRes = await axios.get(`${apiURL}/api/user/${user}`);
  const userObj = userRes.data;
  return { props: { user: userObj } };
};

const AccountSettings: React.FC<IProps> = (props: IProps) => {
  const info = props.user.info;
  const [firstName, setFirstName] = useState(info.firstName);
  const [lastName, setLastName] = useState(info.lastName);
  const [phoneNumber, setPhoneNumber] = useState(info.phoneNumber);
  return (
    <PageWrapper
      active='Account Settings'
      header='Account Settings'
      pageMode='modal'>
      <ModalBackground>
        <BigHeader>Edit your profile</BigHeader>
        <TextInput
          label='First Name'
          defaultValue={info.firstName}
          onChange={setFirstName}
        />
        <TextInput
          label='Last Name'
          defaultValue={info.lastName}
          onChange={setLastName}
        />
        <TextInput
          label='Email Address'
          defaultValue={props.user.email}
          disabled={true}
          style={{ opacity: 0.5 }}
        />
        <TextInput
          label='Phone Number'
          defaultValue={info.phoneNumber}
          onChange={setPhoneNumber}
        />
        <Button
          style={{ marginTop: '46px' }}
          iconUri='/static/img/redesign/checkmark.svg'>
          Save
        </Button>
      </ModalBackground>
    </PageWrapper>
  );
};

export default AccountSettings;
