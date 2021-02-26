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
  const { games, balance, style, compact } = props;

  const generateData = () => {
    return (games || balance || ([] as any)).map((data: any) => (
      <El.DatumBox key={data.id} compact={compact}>
        {!compact && (
          <El.DatumIndicator>
            <El.DatumIndicatorPoint />
            <El.DatumIndicatorLine />
          </El.DatumIndicator>
        )}
        {games && <El.GamePreview src={data.imageUri} />}
        <El.DatumInfo>
          <El.DatumName>{data.artist || data.operation}</El.DatumName>
          <El.DatumDesc>{data.description}</El.DatumDesc>
          {games && !compact && <El.GameBet>{data.bet}</El.GameBet>}
        </El.DatumInfo>
        {!compact && (
          <El.DatumAdditional>
            <El.DatumCredits>${data.credits || data.amount}</El.DatumCredits>
            <El.DatumDate>{'Feb 23' || data.date.toDateString()}</El.DatumDate>
          </El.DatumAdditional>
        )}
      </El.DatumBox>
    ));
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
      {compact ? (
        <El.CompactDataBox>{generateData()}</El.CompactDataBox>
      ) : (
        <El.DataBox>{generateData()}</El.DataBox>
      )}
    </El.OuterContainer>
  );
};

export default History;
