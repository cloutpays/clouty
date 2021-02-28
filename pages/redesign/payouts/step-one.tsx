import React from 'react';
import BigHeader from '../../../components/redesign/BigHeader';
import Description from '../../../components/redesign/Description';
import ModalBackground from '../../../components/redesign/ModalBackground';
import ModalButton from '../../../components/redesign/ModalButton';
import PageWrapper from '../../../components/redesign/PageWrapper';

interface IProps {
  header?: string;
  goBack?: () => void;
  children: React.ReactChildren;
}

const AccountSettings: React.FC<IProps> = () => {
  return (
    <PageWrapper active='Payouts' header='Step One' pageMode='modal'>
      <ModalBackground>
        <BigHeader>Set up a Payout</BigHeader>
        <Description>Please select your preferred payout method.</Description>
        <ModalButton iconUri='/static/img/redesign/rightArrowLong.svg' />
      </ModalBackground>
    </PageWrapper>
  );
};

export default AccountSettings;
