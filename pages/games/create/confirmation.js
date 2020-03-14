import { styles } from '../../../constants/styles';
import React from 'react';
import Wrapper from '../../../components/Wrapper';

const ConfirmSubmission = () => {
  const data = {
    title: 'Confirmation',
    description: 'Your Submission been received!',
  };
  return (
    <Wrapper data={data}>
      <header className='tc ph4'>
        <h1>✅</h1>
        <h1 className='f3 f2-m f1-l black-90 mv3'>THANK YOU</h1>
        <h2 className='f5 f4-m f3-l fw2 black-50 mt0 lh-copy'>
          <p>
            <span>
              If your game is selected we will post it to the game page and
              credit you for your creativity!
            </span>
          </p>
          <div>
            <p className={`${styles.paragraph} f4`}>
              For all questions please email:{' '}
              <a
                href='mailto:julius@clouty.io '
                className={`${styles.linkNormalWeight}`}>
                julius@clouty.io{' '}
              </a>
              <span role='img' aria-label='Bulleye'>
                🎯‍
              </span>
            </p>
          </div>
        </h2>
      </header>
    </Wrapper>
  );
};

export default ConfirmSubmission;
