import Link from 'next/link';
import React from 'react';
import { formatDate } from '../../lib/helpers';
import { GameProps, Option } from '../../lib/types';

interface GameTableProps {
  games: GameProps[];
}

const TABLE_HEADERS = [
  { name: 'Date', id: 0 },
  { name: 'Description', id: 1 },
  { name: 'Options', id: 2 },
  { name: 'User ID', id: 3 },
];

const GameTable: React.FC<GameTableProps> = ({ games }: GameTableProps) => {
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
                <td className='pv3 pr3 bb b--black-20' key='date'>
                  {formatDate(new Date(game.date))}
                </td>
                <td className='pv3 pr3 bb b--black-20' key='description'>
                  {game.description}
                </td>
                <td className='pv3 pr3 bb b--black-20' key='options'>
                  {game.options
                    .map((option: Option) => option.value)
                    .join(', ')}
                </td>
                <td className='pv3 pr3 bb b--black-20' key='user-id'>
                  <Link href={`/dashboard/manage/${game.userId}`}>
                    <a className='no-underline dim black b'>{game.userId}</a>
                  </Link>
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
