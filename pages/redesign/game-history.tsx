import React from 'react';
import History from '../../components/redesign/History';
import PageWrapper from '../../components/redesign/PageWrapper';

interface IProps {
  header?: string;
  goBack?: () => void;
  children: React.ReactChildren;
}

const GameHistory: React.FC<IProps> = () => {
  return (
    <PageWrapper active='Home' header='Games History' pageMode='modal'>
      <History
        noHeader={true}
        games={(new Array(7) as any).fill(
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
    </PageWrapper>
  );
};

export default GameHistory;
