import React, { useEffect, useState } from 'react';
import * as El from './styles';

interface IProps extends React.HTMLProps<HTMLElement> {
  amount: number;
  error?: boolean;
  onEdit?: (value: number) => void;
}

const BigMoney: React.FC<IProps> = (props: IProps) => {
  const [displayed, setDisplayed] = useState('0');
  const [incorrect, setIncorrect] = useState(false);

  useEffect(() => {
    tryToChange(props.amount.toString());
  }, [props.amount]);

  const tryToChange = (value: string) => {
    if (value.length > 5) return;
    setDisplayed(value);
    if (isNaN(Number(value))) {
      setIncorrect(true);
    } else {
      setIncorrect(false);
      props.onEdit && props.onEdit(Number(value));
    }
  };

  return (
    <El.OuterContainer>
      <span>$</span>
      {props.onEdit ? (
        <El.Editable
          value={displayed}
          onChange={(t) => tryToChange(t.target.value)}
          style={{
            width: displayed.length * 48 || 48,
            color: incorrect || props.error ? '#ee1010' : undefined,
          }}
        />
      ) : (
        <span>{props.amount.toFixed(2)}</span>
      )}
    </El.OuterContainer>
  );
};

export default BigMoney;
