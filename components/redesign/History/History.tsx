import React from 'react';
import * as El from './styles';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

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
  onClickGame?: (id: string) => void;
  onClickMore?: () => void;
  // TODO: Type this
  style?: any;
}

const History: React.FC<IProps> = (props: IProps) => {
  const { games, balance, style, compact, onClickGame } = props;

  const parseDate = (date: string) => {
    const d = new Date(date);
    return months[d.getMonth() || 0] + ' ' + d.getDate();
  };

  const generateData = () => {
    return (games || balance || ([] as any)).map((data: any) => (
      <El.DatumBox
        key={data.id}
        compact={compact}
        onClick={() => onClickGame && onClickGame(data.id)}>
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
            <El.DatumDate>{parseDate(data.date)}</El.DatumDate>
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
          <El.SeeMoreButton
            src='/static/img/redesign/rightArrow.svg'
            onClick={props.onClickMore}
          />
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