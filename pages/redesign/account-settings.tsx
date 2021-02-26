import React from 'react';
import BigHeader from '../../components/redesign/BigHeader';
import ModalBackground from '../../components/redesign/ModalBackground';
import PageWrapper from '../../components/redesign/PageWrapper';
import TextInput from '../../components/redesign/TextInput';

interface IProps {
  header?: string;
  goBack?: () => void;
  children: React.ReactChildren;
}

const AccountSettings: React.FC<IProps> = () => {
  return (
    <PageWrapper
      active='Account Settings'
      header='Account Settings'
      pageMode='modal'>
      <ModalBackground>
        <BigHeader>Edit your profile</BigHeader>
        <TextInput label='First Name' />
        <TextInput label='Last Name' />
        <TextInput label='Email Address' />
        <TextInput label='Phone Number' />
      </ModalBackground>
    </PageWrapper>
  );
};

export default AccountSettings;
