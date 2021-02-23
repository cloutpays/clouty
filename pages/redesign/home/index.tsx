import React from 'react';
import History from '../../../components/redesign/History';
import BalanceBox from '../../../components/redesign/home/BalanceBox';
import FeaturedBets from '../../../components/redesign/home/FeaturedBets';
import UserAvatar from '../../../components/redesign/home/UserAvatar';
import PageWrapper from '../../../components/redesign/PageWrapper';
import * as El from './styles';

interface IProps {
  header?: string;
  goBack?: () => void;
  children: React.ReactChildren;
}

const Home: React.FC<IProps> = (props: IProps) => {
  return (
    <PageWrapper showUserGreeting={true} active='Home' header={props.header}>
      <El.UserInfoBox>
        <UserAvatar />
        <BalanceBox balance='2.137' credit='503' />
      </El.UserInfoBox>
      <El.FeaturedBetsBox>
        <El.SectionHeader>
          <El.SectionHeaderText>Weeks Featured Bets</El.SectionHeaderText>
          <El.SeeAllButton>See All</El.SeeAllButton>
        </El.SectionHeader>
        <FeaturedBets
          categories={['Certified Lover Boy', 'Beat Box', 'New Music Friday']}
          bets={[
            {
              label: 'New Music Friday',
              imageUri:
                'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2016%2F12%2Fdeath-grips-mc-ride-stefan-burnett-solo-exhibition-slow-culture.jpg?q=90&w=1400&cbr=1&fit=max',
            },
            {
              label: 'Certified Lover Boy',
              imageUri:
                'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2016%2F12%2Fdeath-grips-mc-ride-stefan-burnett-solo-exhibition-slow-culture.jpg?q=90&w=1400&cbr=1&fit=max',
            },
            {
              label: 'Certified Lover Boy',
              imageUri:
                'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2016%2F12%2Fdeath-grips-mc-ride-stefan-burnett-solo-exhibition-slow-culture.jpg?q=90&w=1400&cbr=1&fit=max',
            },
          ]}
        />
        <El.HistorySections>
          <History
            games={(new Array(5) as any).fill(
              {
                id: 1,
                artist: 'The Weekend',
                description: 'Number of tracks on new album',
                bet: '11',
                date: new Date(),
                credits: '390.00',
                imageUri:
                  'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2016%2F12%2Fdeath-grips-mc-ride-stefan-burnett-solo-exhibition-slow-culture.jpg?q=90&w=1400&cbr=1&fit=max',
              },
              0,
              10,
            )}
          />
          <History
            balance={(new Array(5) as any).fill(
              {
                id: 1,
                operation: 'Payout',
                description: 'Account ending ****4362',
                date: new Date(),
                amount: '100.00',
              },
              0,
              10,
            )}
          />
        </El.HistorySections>
      </El.FeaturedBetsBox>
    </PageWrapper>
  );
};

export default Home;
