import Link from 'next/link';
import React, { useState } from 'react';
import BigHeader from '../../../components/redesign/BigHeader';
import Description from '../../../components/redesign/Description';
import ModalBackground from '../../../components/redesign/ModalBackground';
import ModalButton from '../../../components/redesign/ModalButton';
import PageWrapper from '../../../components/redesign/PageWrapper';
import TextInput from '../../../components/redesign/TextInput';

interface IProps {
  fullAmount: number;
}

const BetStepOne: React.FC<IProps> = () => {
  const [value, setValue] = useState('');
  const betDescription =
    "What could the name of the song playing in the background of Uzi's diamond reveal video (via IG) be?";

  return (
    <PageWrapper active='Our Active Bets' header='Step One' pageMode='modal'>
      <ModalBackground>
        <BigHeader>Place a Bet</BigHeader>
        <Description style={{ fontWeight: 500 }}>
          {betDescription || "Bet couldn't be loaded, please try again."}
        </Description>
        {betDescription && (
          <TextInput label='Your Bet' onChange={(v) => setValue(v)} />
        )}
        <Link href='/redesign/bet/step-two'>
          <ModalButton
            iconUri='/static/img/redesign/rightArrowLong.svg'
            disabled={!value}
          />
        </Link>
      </ModalBackground>
    </PageWrapper>
  );
};

export default BetStepOne;
