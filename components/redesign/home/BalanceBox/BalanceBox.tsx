import React from 'react';
import * as El from './styles';

interface IProps {
  balance: string;
  credit: string;
  onAdd?: () => void;
}

const BalanceBox: React.FC<IProps> = (props: IProps) => (
  <El.OuterContainer>
    <El.LeftContainer>
      <El.Balance>Balance</El.Balance>
      <El.Value>${props.balance || '2.137'}</El.Value>
    </El.LeftContainer>
    <El.RightContainer>
      <El.Credit>Credit</El.Credit>
      <El.Value>${props.credit || '503'}</El.Value>
    </El.RightContainer>
    <El.AddButton onClick={props.onAdd} href='#'>
      +
    </El.AddButton>
  </El.OuterContainer>
);

export default BalanceBox;
