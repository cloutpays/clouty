import React, { useState } from 'react';

interface SignUpFormProps {
  user: any;
}
export const XXLForm: React.FC<SignUpFormProps> = () => {
  const [answer] = useState<string[]>([]);
  const [artists, setArtists] = useState<string[]>(
    [
      'DaBaby',
      'Lil Baby',
      'YNW Melly',
      'Polo G',
      'Lil Tjay',
      'YBN Cordae',
      'Gunna',
      'Blueface',
      'Lil Nas X',
      'YBN Nahmir',
      'Lil Mosey',
      'Cardi B',
      'Flipp Dinero',
      'Sheck Wes',
      'Saweetie',
      'Yung Bans',
      'Young Nudy',
      'Dave',
      'Tierra Whack',
      'Bhad Bhabie',
      'Don Toliver',
      'Noname',
      'Kid Trunks',
      'Asian Doll',
      'Pardison Fontaine',
      '$tupid Young',
      'Pop Smoke',
      'YoungBoy Never Broke Again',
      'Lil Keed',
      'Pop Smoke',
      'Guapdad 4000',
      'Rod Wave',
      'Jack Harlow',
      'Kaash Paige',
      'Baby Keem',
      'Arizonia Zervas',
      'Layton Greene',
      'King Von',
      'Fivio Foreign',
      'Arin Ray',
      'Trevor Daniel',
      'Stunna 4 Vegas',
      '2KBABY',
      'Mulatto',
      'Duke Duece',
      'Yung Baby Tate',
      'Hitman',
      'Flo Milli',
      'Quando Rondo',
      'Sheff G',
      'King Von',
      'JackBoy',
    ].sort(),
  );

  const popArtist = (ind: number) => {
    const deleteArtist = artists[ind];
    answer.push(artists[ind]);
    setArtists(artists.filter((curr) => curr !== deleteArtist));
  };

  return (
    <div>
      <div className='f4 f2-ns fw7'>Choose your 10 artists</div>
      {answer.map((curr) => {
        return (
          <div key={curr} className='f4 noselect f2-ns b db pa2 link dim white'>
            {curr}
          </div>
        );
      })}
      <ul className='list pa2 ph5-ns'>
        {artists.map((curr, ind) => {
          return (
            <li key={ind} onClick={() => popArtist(ind)} className='dib mr2'>
              <div className='f4 noselect f2-ns b db pa2 link dim white'>
                {curr}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
