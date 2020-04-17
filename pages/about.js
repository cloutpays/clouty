import { styles } from '../constants/styles';
import React from 'react';
import Wrapper from '../components/layout/Wrapper';

const data = {
  description: 'Make money while putting your intuition on the line.',
  header: 'Clouty is a platform that was created from the love of music.',
};
const Home = () => (
  <Wrapper data={data}>
    <section className='ma3 ma4-l'>
      <p className={`${styles.paragraph}`}>
        The idea was initially birthed in December &apos;19, after our founder,
        David Umeh discovered an artist from Maryland, named{' '}
        <a
          target='_blank'
          rel='noopener noreferrer'
          href='https://www.instagram.com/foggieraw'
          alt='Foggie Raw'
          title='Foggie Raw'
          className={`${styles.link}`}>
          Foggie Raw
        </a>
        .Upon hearing this artists&apos; music, David knew that Foggie&apos;s
        cadence and presence had a serious shot at making it into the big
        leagues. Being an avid listener and creator of music himself, David also
        was a member of a large iMessage Group chat where nothing but music was
        discussed and debated.
      </p>
      <p className={`${styles.paragraph}`}>
        David recalls vividly sharing his sentiments for Foggie&apos;s music in
        the group chat and asking them to check him out.{' '}
        <span role='img' aria-label='Bulleye'>
          🎯‍
        </span>
        He then went on to say, &quot;This guy is gonna blow....if I could put
        my money on it, I would.&quot;
      </p>
      <p className={`${styles.paragraph}`}>
        It then dawned on him that there was no platform, where as in sports,
        where people could actually put their money where their mouth is and
        base their predictions on things that would happen in music. He then
        vowed to himself (and the group chat) that he would be the first person
        to properly execute a platform of this nature.
        <span role='img' aria-label='Sparkles'>
          ✨
        </span>
      </p>
      <p className={`${styles.paragraph}`}>
        All inquiries:{' '}
        <a href='mailto:info@clouty.io ' className={`${styles.link}`}>
          info@clouty.io
        </a>{' '}
        <span role='img' aria-label='Bulleye'>
          🎯‍
        </span>
      </p>
    </section>
  </Wrapper>
);

export default Home;
