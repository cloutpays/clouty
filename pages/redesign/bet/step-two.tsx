import React, { useState } from 'react';
import BigHeader from '../../../components/redesign/BigHeader';
import BigMoney from '../../../components/redesign/BigMoney';
import Description from '../../../components/redesign/Description';
import ModalBackground from '../../../components/redesign/ModalBackground';
import ModalButton from '../../../components/redesign/ModalButton';
import ModalOverPage from '../../../components/redesign/ModalOverPage';
import PageWrapper from '../../../components/redesign/PageWrapper';
import * as El from '../../../components/redesign/payouts/styles';

interface IProps {
  fullAmount: number;
  yourBet: string;
  yourAnswer: string;
}

const AMOUNTS = [50, 100, 250, 500, 1000];

const StepTwo: React.FC<IProps> = (props: IProps) => {
  const [amount, setAmount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const placeBet = () => {
    setModalOpen(true);
  };

  return (
    <PageWrapper active='Our Active Bets' header='Step Two' pageMode='modal'>
      <ModalBackground>
        <BigHeader>Place a Bet</BigHeader>
        <Description style={{ fontWeight: 500 }}>Select your wager</Description>
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
        <ModalButton
          iconUri='/static/img/redesign/checkmark.svg'
          iconHeight={15}
          onClick={placeBet}
          disabled={!amount || amount > props.fullAmount}>
          Place Bet
        </ModalButton>
      </ModalBackground>
      {modalOpen && (
        <ModalOverPage>
          <El.UpperOverlay src='/static/img/redesign/confetti.svg' />
          <El.InnerOver>
            <El.Header>Congratulations!</El.Header>
            <El.Info>You have placed</El.Info>
            <BigMoney amount={amount} />
            <El.Info>Your Answer</El.Info>
            <El.InfoSmall>{props.yourAnswer || 'Example Bet'}</El.InfoSmall>
            <El.Info>Your Bet</El.Info>
            <El.InfoSmall>
              {props.yourBet || 'Example bet description'}
            </El.InfoSmall>
            <El.InnerSeparator />
            <ModalButton onClick={() => setModalOpen(false)}>Close</ModalButton>
          </El.InnerOver>
        </ModalOverPage>
      )}
    </PageWrapper>
  );
};

export default StepTwo;
