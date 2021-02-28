import Link from 'next/link';
import React, { useState } from 'react';
import BigHeader from '../../../components/redesign/BigHeader';
import Description from '../../../components/redesign/Description';
import ModalBackground from '../../../components/redesign/ModalBackground';
import ModalButton from '../../../components/redesign/ModalButton';
import PageWrapper from '../../../components/redesign/PageWrapper';
import PaymentMethodList from '../../../components/redesign/payouts/PaymentMethodList';
import TextInput from '../../../components/redesign/TextInput';
import { PaymentMethod } from '../../../constants/types';

interface IProps {
  header?: string;
  goBack?: () => void;
  children: React.ReactChildren;
}

const AccountSettings: React.FC<IProps> = () => {
  const [chosen, setChosen] = useState(undefined as PaymentMethod | undefined);
  const [value, setValue] = useState('');

  const getLabel = (method?: PaymentMethod) => {
    switch (method) {
      case PaymentMethod.ApplePay:
        return 'Phone Number or Apple ID';
      case PaymentMethod.CashApp:
        return 'Cash App Handle';
      case PaymentMethod.PayPal:
        return 'PayPal Email';
      default:
        return '';
    }
  };

  return (
    <PageWrapper active='Payouts' header='Step One' pageMode='modal'>
      <ModalBackground>
        <BigHeader>Set up a Payout</BigHeader>
        <Description>Please select your preferred payout method.</Description>
        <PaymentMethodList
          chosen={chosen}
          onChoose={(choice) => setChosen(choice)}
        />
        {chosen && (
          <TextInput label={getLabel(chosen)} onChange={(v) => setValue(v)} />
        )}
        <Link href='/redesign/payouts/step-two'>
          <ModalButton iconUri='/static/img/redesign/rightArrowLong.svg' />
        </Link>
      </ModalBackground>
    </PageWrapper>
  );
};

export default AccountSettings;
