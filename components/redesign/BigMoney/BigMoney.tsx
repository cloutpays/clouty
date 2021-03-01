import React from 'react';
import * as El from './styles';

interface IProps extends React.HTMLProps<HTMLElement> {
  amount: number;
  onEdit?: (value: number) => void;
}

const BigMoney: React.FC<IProps> = (props: IProps) => (
  <El.OuterContainer>
    <span>$</span>
    {props.onEdit ? (
      <El.Editable
        value={props.amount}
        size={Math.ceil(props.amount.toString().length / 2) || 1}
        onChange={(t) => {
          props.onEdit && props.onEdit(Number(t.target.value) || 0);
        }}
      />
    ) : (
      <span>{props.amount.toFixed(2)}</span>
    )}
  </El.OuterContainer>
);

export default BigMoney;
