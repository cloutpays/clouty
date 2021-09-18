import React from 'react';
import BigHeader from '../components/redesign/BigHeader';
// import Button from '../components/redesign/Button';
import Description from '../components/redesign/Description';
import ModalBackground from '../components/redesign/ModalBackground';

import PageWrapper from '../components/redesign/PageWrapper';
import { formatDateTime } from '../lib/helpers';
import { MarketProps } from '../lib/types';

interface IProps {
  user: any;
  bet: any;
  market: MarketProps;
}

const market: MarketProps = {
  expiration: new Date(),
  price: 99,
  quantity: 0,
  class: '',
  title: 'Will Drake drop Certified Lover Boy by the end of the summer',
  createDate: new Date(),
  description:
    'Drake’s latest album, Certified Lover Boy, has been in the works since 2019. It was originally scheduled to drop in January 2021, but Drake’s knee injury reportedly delayed it. Six months later, he told fans that the album was in the mixing process, adding, “Album’s ready...album’s cooked, looking forward to delivering it to you...Certified Lover Boy on the way and that’s for anyone in the way.”',
  caseNo: '',
  caseYes: '',
  openDate: new Date(),
  lastPrice: 99,
  prevYesBid: 99,
  prevYesAsk: 100,
  yesBid: 99,
  yesAsk: 100,
  imageUrl: '',
  tags: [],
  source: [
    {
      name: 'neilsen',
    },
  ],
  volume: 29002,
  likes: 298,
  status: '',
  minTickSize: 4,
  underlying: '',
  resolution: '',
};

const BetStepOne: React.FC<IProps> = () => {
  // const [value, setValue] = useState({} as any);
  // const gameClosed = bet.answer ? true : false;
  return (
    <PageWrapper
      active='Our Active Bets'
      // header={gameClosed ? 'Game Closed' : 'Place a Bet'}
      pageMode='modal'>
      <ModalBackground>
        <BigHeader>{market.title}</BigHeader>

        <Description style={{ fontWeight: 500, marginBottom: 0 }}>
          {`Expires  ${formatDateTime(market.expiration)}`}
        </Description>
        <Description style={{ fontWeight: 500, marginBottom: 0 }}>
          {`Volume  ${market.volume} contracts`}
        </Description>
        <Description style={{ fontWeight: 500, marginBottom: 0 }}>
          {`${market.likes} likes`}
        </Description>
        <Description style={{ fontWeight: 500 }}>
          {market.description || "Bet couldn't be loaded, please try again."}
        </Description>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
          }}/>
      </ModalBackground>
    </PageWrapper>
  );
};

export default BetStepOne;
