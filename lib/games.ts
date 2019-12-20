const games = [
  {
    class: 'trillectro',
    answer: 'Fab',
    date: '2018-11-07',
    endDate: '2018-12-06',
    description:
      "The Game and Fab drop Nov.29th w/ 'Born 2 Rap and 'SS3'. Who will sell more in the first week?",
    emoji: '📚',
    options: [
      { value: 'The Game', key: 'The Game' },
      { value: 'Fabolous', key: 'Fabolous' },
    ],
    slug: 'game-and-fab',
    question: '1',
    type: 'select',
  },
  {
    class: 'apprentice-at',
    date: '2018-11-07',
    description:
      'Larry June has dropped five projects in 2019. Will he close out 2019 with a 6th?',
    emoji: '🍊',
    options: [
      { value: 'Yes', key: 'Yes' },
      { value: 'No', key: 'No' },
    ],
    slug: 'larry-june',
    question: '2',
    type: 'select',
  },

  {
    answer: 'Fivio Foreign - Richer Than Ever',
    class: 'hoist',
    date: '2018-11-07',
    endDate: '2018-12-12',

    description: 'Who gonna have the next banger? Pop Smoke or Fivio Foreign',
    emoji: '📚',
    options: [
      { value: 'Fivio Foreign', key: 'Fivio Foreign' },
      { value: 'Pop Smoke', key: 'Pop Smoke' },
    ],
    slug: 'next-banger',
    question: '3',
    type: 'select',
  },
  {
    class: 'kanye-wtf',
    date: '2018-11-07',
    description:
      'Buddy is going on tour very soon. He recently asked his fans to suggest his opening act. Who do you believe it will be?',
    emoji: '📚',
    options: [
      { value: 'Azchike', key: 'Azchike' },
      { value: 'Smino', key: 'Smino' },
      { value: 'Malia', key: 'Malia' },
      { value: 'Neither', key: 'Neither' },
    ],
    slug: 'buddy',
    question: '4',
    type: 'select',
  },
  {
    answer: 'Roddy, French Montana, Max B',
    class: 'apprentice-at',
    date: '2018-11-07',
    description:
      'Friday December 6th the following albums drop. In which order will these chart for the 1st week sales? Parlay winner wins x 3. Roddy Rich "PEMFBA", Max B "House Money", French Montana "MONTANA',
    emoji: '📚',
    options: [
      { value: 'Roddy Rich "PEMFBA"', key: 'Roddy Rich "PEMFBA"' },
      { value: 'Max B "House Money"', key: 'Max B "House Money"' },
      {
        value: 'French Montana "MONTANA"',
        key: 'French Montana "MONTANA"',
      },
    ],
    slug: 'fri-dec-6',
    endDate: '2018-12-13',

    question: '5',
    type: 'select-multiple',
  },
  {
    class: 'komputer-maschine',
    date: '2018-11-07',
    description: `Our favorite songs usually aren’t the ones that make it to the radio. The masses tend to eat whatever they're fed. What song off Roddy Rich’s project is going to be the “Radio friendly smash"`,
    emoji: '📚',
    options: [
      { value: 'Bacc Seat ft. Ty $ Sign', key: 'Bacc Seat ft. Ty $ Sign' },
      { value: ' Tip Toe ft. A Boogie ', key: ' Tip Toe ft. A Boogie ' },
      {
        value: 'Moonwalkin Ft. Lil durk ',
        key: 'Moonwalkin Ft. Lil durk ',
      },
      {
        value: 'Peta Ft. Meek Mill',
        key: 'Peta Ft. Meek Mill',
      },
    ],
    slug: 'roddy',
    question: '6',
    type: 'select',
  },
  {
    class: 'style-guide ',
    date: '2018-11-07',
    endDate: '2018-12-18',

    description:
      'Controversial artist 6ix9ine has been reportedly scheduled to be released from prison in 72 hours. Will he be released this week?',
    emoji: '🧢',
    options: [
      { value: 'Happen', key: 'Happen' },
      { value: 'Not Happen', key: 'Not Happen' },
    ],
    slug: '6ix9nine-release',
    question: '7',
    type: 'select',
    answer: 'Not Happening',
  },
  {
    class: 'mark-gierl',
    date: '2018-11-07',
    endDate: '2018-12-18',

    description: `If 6ix9ine does gets out, most people suspect that he will drop a record to break the silence. There's no telling what the actual strategy will be. What is he going to drop first?
    `,
    emoji: '🤡',
    options: [
      { value: 'Latin Record', key: 'Latin Record' },
      { value: 'Hip Hop Record', key: 'Hip Hop Record' },
      {
        value: 'EP/Project',
        key: 'EP/Project',
      },
      {
        value: 'None of the above',
        key: 'None of the above',
      },
    ],
    answer: 'None of the above',
    slug: '6ix-9ine',
    question: '8',
    type: 'select',
  },
  {
    class: 'mycumortgage',
    date: '2018-11-07',
    description:
      'There is no slowing down with Atlanta’s own Mulatto, who dropped “Hit the Lotto on 12/12. Interscope artist, Smokepurpp dropped ‘DeathStarr 2’ on 12/13. Who do you think will chart higher for 1st week sales? ',
    emoji: '💃🏽',
    options: [
      { value: 'Mulatoo', key: 'Mulatoo' },
      { value: 'SmokePurpp', key: 'SmokePurpp' },
    ],
    slug: 'smoke-mulatoo',
    question: '9',
    type: 'select',
  },
  {
    class: 'trillectro',
    date: '2018-11-07',
    description:
      'Cam’ron and Curren$y drop December 20th with ‘Purple Haze 2’ and ‘Back at Burnies’. Who will sell more in the first week?',
    emoji: '☔️',
    options: [
      { value: 'Cam’ron', key: 'Cam’ron' },
      { value: 'Curren$y', key: 'Curren$y' },
    ],
    slug: 'camron-vs-currensy',
    question: '10',
    type: 'select',
  },
];
export default games;
