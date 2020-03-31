import React from 'react';

interface Option {
  value: string;
  key: string;
}

interface Game {
  description: string;
  emoji: string;
  options: [Option];
  answer: string;
  type: string;
  gameType: string;
  slug: string;
  extendedAnswer: string;
  class: string;
  question: string;
}

interface GameTableProps {
  games: Game[];
}

const TABLE_HEADERS = [
  { name: 'Description', id: 1 },
  { name: 'Options', id: 2 },
];

const GameTable: React.FC<GameTableProps> = ({ games }) => {
  return (
    <>
      <table className='f6 w-100 mw8 center' cellSpacing='0'>
        <thead>
          <tr>
            {TABLE_HEADERS.map(({ name, id }) => (
              <th key={id} className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='lh-copy'>
          {games.map((game, index) => {
            return (
              <tr key={index}>
                <td className='pv3 pr3 bb b--black-20' key='description'>
                  {game.description}
                </td>
                <td className='pv3 pr3 bb b--black-20' key='options'>
                  {game.options
                    .map((option: Option) => option.value)
                    .join(', ')}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default GameTable;
