import React, { useState } from 'react';

interface SignUpFormProps {
  user: any;
}
export const XXLForm: React.FC<SignUpFormProps> = () => {
  const [answer, setAnswer] = useState<string[]>([]);
  const [artists, setArtists] = useState<string[]>([
    'ABG Neal',
    'Abby Jasmine',
    'Asian Doll',
    'AzChike',
    'Baby Keem',
    'Bandhunta Izzy',
    'Bankroll Freddie',
    'BbyMutha',
    'BigKlit',
    'Blacc Zacc',
    'Calboy',
    'Caiden',
    'Capolow',
    'Chika',
    'Coi Leray',
    'Cuban Doll',
    'D Smoke',
    'DaniLeigh',
    'Danny Towers',
    'Dax',
    'Don Toliver',
    'Duke Deuce',
    'Fivio Foreign',
    'Flo Milli',
    'FredRarrii',
    'Fredo Bang',
    'Gnar',
    'Guapdad 4000',
    'HDBeenDope',
    'Hott LockedN',
    'Iann Dior',
    'Jackboy',
    'Jack Harlow',
    'Jasiah',
    'J.I.',
    'Jordan Hollywood',
    'Jucee Froot',
    'Justin Rarri',
    'Key Glock',
    'Kidd Kenn',
    'King Von',
    'Lil Gotit',
    'Lil Keed',
    'Lil Loaded',
    'Lil Migo',
    'Lil Tecca',
    'Lil Tjay',
    'Lil West',
    'Lil Zay Osama',
    'Luh Kel',
    'Luh Soldier',
    'Marlo',
    'Matt Ox',
    'Mulatto',
    'Ms Banks',
    'NLE Choppa',
    'NoCap',
    'Polo G',
    'Quando Rondo',
    'Queen Key',
    'Quin NFN',
    'Reason',
    'Renni Rucci',
    'Rod Wave',
    'Sada Baby',
    'Sheff G',
    'ShooterGang Kony',
    'Shordie Shordie',
    'Skooly',
    'Slayter',
    'Sleepy Rose',
    "Smoove'l",
    'Splurge',
    'Sprado',
    '$not',
    'Stunna 4 Vegas',
    'Stunna Girl',
    'Suigeneris',
    'Teejayx6',
    'TJ Porter',
    'Toosii',
    'Tyla Yahweh',
    'Whookilledkenny',
    'Worl',
    'Xanman',
    'YSN Flow',
    'Yung Baby Tate',
    'Yung Mal',
    'Yungeen Ace',
    '1takejay',
    '10k.Caash',
    '2kBaby',
    '22Gz',
    '24kGoldn',
    '42 Dugg',
    '9lokknine',
  ]);

  const selectArtist = (ind: number) => {
    const deleteArtist = artists[ind];
    const answers = answer;
    answers.push(artists[ind]);
    setAnswer(answers);
    setArtists(artists.filter((curr) => curr !== deleteArtist));
  };
  const popArtist = (artistName: string) => {
    const newArtists = artists;
    newArtists.push(artistName);
    setAnswer(answer.filter((curr) => curr !== artistName));
    setArtists(newArtists);
  };

  return (
    <div>
      <div className='f4 f2-ns fw7'>Choose your 10 artists</div>
      {answer.map((curr) => {
        return (
          <div key={curr} className='f4 noselect f2-ns b db pa2 link dim black'>
            <span onClick={() => popArtist(curr)}>x </span>
            {curr}
          </div>
        );
      })}
      <ul className='list pa2 ph5-ns'>
        {artists.sort().map((curr, ind) => {
          return (
            <li key={ind} onClick={() => selectArtist(ind)} className='dib mr2'>
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
