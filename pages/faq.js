import React from 'react';
import Wrapper from '../components/layout/Wrapper';

const data = {
  title: `Frequently Asked Questions`,
  description: 'Make money while putting your intuition on the line.',
  header: `Frequently Asked Questions`,
};
const Faq = () => (
  <Wrapper data={data}>
    <div className='ma3 ma4-l'>
      <strong>Is this really real?</strong>
      <p>
        Yes. Clouty is ran by a team who are always on the other side making
        sure the platform is running smoothly.
      </p>
      <strong>How do I know that my bet has been placed?</strong>
      <p>
        After submitting your information, you will receive a confirmation text
      </p>
      <strong>What if I did not receive a text?</strong>
      <p>
        If you have not received one (some sprint users experience this) then
        please contact one of us and we will troubleshoot that for you
      </p>
      <strong>How do I know if I won or not?</strong>
      <p>
        All winners are notified of their place as soon as the contests are over
        via text, email, or both for live events winners are notified in real
        time
      </p>
      <strong>
        It says on the site that users can submit their own questions to become
        bets. How does that work?
      </strong>
      <p>
        If you have an interesting question that is hyper specific, then feel
        free to submit it for approval by our contest board. Our team will
        review it and let you know if it has been approved
      </p>
      <strong>Do I get anything for submitting the question?</strong>
      <p>
        That’s a very good question. We are working out a system to where
        submitters can receive points or free $$ to bet for submitting topnotch
        questions
      </p>
      <strong>How do I subscribe to the newsletter?</strong>
      <p>
        There is a link at the bottom of the page where you can find our
        newsletter and subscribe to it’s weekly outputs
      </p>
      <strong>
        I have a general question that isn’t answered here… What should I do?
      </strong>
      <p>Email us at breemz@clouty.io</p>
      <strong>Do you offer refunds?</strong>
      <p>We do not offer refunds. All bets are final.</p>
    </div>
  </Wrapper>
);

export default Faq;
