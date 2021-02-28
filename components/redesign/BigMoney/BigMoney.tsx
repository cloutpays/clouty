import React from 'react';
import * as El from './styles';

interface IProps extends React.HTMLProps<HTMLElement> {
  amount: number;
}

const BigMoney: React.FC<IProps> = (props: IProps) => (
  <El.OuterContainer>
    <span>$</span>
    <span>{props.amount.toFixed(2)}</span>
  </El.OuterContainer>
);

export default BigMoney;
