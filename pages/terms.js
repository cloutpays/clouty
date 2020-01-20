import React from 'react';
import Wrapper from '../components/Wrapper';

const data = {
  description: 'Make money while putting your intuition on the line.',
  header: `The 🌎's first music betting platform.`,
};
const Terms = () => (
  <div>
    <Wrapper data={data} className='measure-wide'>
      <p>
        <strong>Disclaimer: </strong>Gambling is legal under U.S. federal law.
      </p>
      <p>
        Gambling should be entertaining. Remember that you always risk losing
        the money you bet, so do not spend more than you can afford to lose.{' '}
      </p>
    </Wrapper>
  </div>
);

export default Terms;
