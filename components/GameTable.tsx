import React from 'react';
import Modal from './Modal';

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

const GameTable: React.FC<GameTableProps> = ({ games }) => {
  return (
    <>
      <table className='f6 w-100 mw8 center' cellSpacing='0'>
        <thead>
          <tr>
            <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>
              Description
            </th>
            <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>Options</th>
            <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>Status</th>
            <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>Submit </th>
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
                <td className='pv3 pr3 bb b--black-20' key='status'>
                  {'Submitted'}
                </td>
                <td className='pv3 pr3 bb b--black-20' key='confirm'>
                  <Modal
                    content={game.description}
                    title='Do you want to add this game?'
                  />
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
