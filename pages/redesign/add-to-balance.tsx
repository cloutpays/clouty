import React, { useState } from 'react';
import BigHeader from '../../components/redesign/BigHeader';
import BigMoney from '../../components/redesign/BigMoney';
import Description from '../../components/redesign/Description';
import ModalBackground from '../../components/redesign/ModalBackground';
import ModalButton from '../../components/redesign/ModalButton';
import PageWrapper from '../../components/redesign/PageWrapper';
import * as El from '../../components/redesign/payouts/styles';

interface IProps {
  fullAmount: number;
}

const AMOUNTS = [50, 100, 250, 500, 1000];

const AddToBalance: React.FC<IProps> = () => {
  const [amount, setAmount] = useState(0);

  return (
    <PageWrapper active='Add to Balance' header='Step One' pageMode='modal'>
      <ModalBackground>
        <BigHeader>Add to Balance</BigHeader>
        <Description>Amount</Description>
        <BigMoney amount={amount} />
        <El.HorizontalScrollable>
          {AMOUNTS.map((a) => {
            return a === amount ? (
              <El.SelectedOption key={a}>${a}</El.SelectedOption>
            ) : (
              <El.Option onClick={() => setAmount(a)} key={a}>
                ${a}
              </El.Option>
            );
          })}
        </El.HorizontalScrollable>
        <ModalButton iconUri='/static/img/redesign/rightArrowLong.svg' />
      </ModalBackground>
    </PageWrapper>
  );
};

export default AddToBalance;
