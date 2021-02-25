import React from 'react';
import * as El from './styles';

interface IProps extends React.HTMLProps<HTMLElement> {
  // TODO: Move into a separate types file
  games?: {
    id: string;
    artist: string;
    description: string;
    bet: string;
    date: Date;
    credits: string;
    imageUri: string;
  }[];
  balance?: {
    id: string;
    operation: string;
    description: string;
    amount: string;
    date: Date;
  }[];
  compact?: boolean;
  noHeader?: boolean;
  // TODO: Type this
  style?: any;
}

const History: React.FC<IProps> = (props: IProps) => {
  const { games, balance, style } = props;

  const generateData = () => {
    if (games) {
      return games.map((game) => (
        <El.DatumBox key={game.id}>
          <El.DatumIndicator>
            <El.DatumIndicatorPoint />
            <El.DatumIndicatorLine />
          </El.DatumIndicator>
          <El.GamePreview src={game.imageUri} />
          <El.DatumInfo>
            <El.DatumName>{game.artist}</El.DatumName>
            <El.DatumDesc>{game.description}</El.DatumDesc>
            <El.GameBet>{game.bet}</El.GameBet>
          </El.DatumInfo>
          <El.DatumAdditional>
            <El.DatumCredits>${game.credits}</El.DatumCredits>
            <El.DatumDate>{'Feb 23' || game.date.toDateString()}</El.DatumDate>
          </El.DatumAdditional>
        </El.DatumBox>
      ));
    }
    if (balance) {
      return balance.map((bal) => (
        <El.DatumBox key={bal.id}>
          <El.DatumIndicator>
            <El.DatumIndicatorPoint />
            <El.DatumIndicatorLine />
          </El.DatumIndicator>
          <El.DatumInfo>
            <El.DatumName>{bal.operation}</El.DatumName>
            <El.DatumDesc>{bal.description}</El.DatumDesc>
          </El.DatumInfo>
          <El.DatumAdditional>
            <El.DatumCredits>${bal.amount}</El.DatumCredits>
            <El.DatumDate>{'Feb 23' || bal.date.toDateString()}</El.DatumDate>
          </El.DatumAdditional>
        </El.DatumBox>
      ));
    }
    return null;
  };

  return (
    <El.OuterContainer style={style}>
      {!props.noHeader && (
        <El.Header>
          <El.Title>
            {props.games ? 'Game History' : 'Balance History'}
          </El.Title>
          <El.SeeMoreButton src='/static/img/redesign/rightArrow.svg' />
        </El.Header>
      )}
      <El.DataBox>{generateData()}</El.DataBox>
    </El.OuterContainer>
  );
};

export default History;
