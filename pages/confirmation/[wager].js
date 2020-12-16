import { styles } from '../../constants/styles';
import React from 'react';
import Wrapper from '../../components/layout/Wrapper';

const data = {
  description: 'Make money while putting your intuition on the line.',
  header: 'Your submission has been received!',
  confirmation_page: true

};
const Confirmation = () => (

    <Wrapper data={data}>
      <div className='section-services confirmation-page'>
                  <div className='row'>
                    <div className='col-md-4 col-lg-3 col-sm-6'>
                      <div className='single-service'>
                        <div className='part-1'>
                        <div className='service-icon text-center'>&#128499;</div>
                        <p className={`${styles.paragraph}`}>
          Your wager has been entered into our system. May the odds forever be
          in your favor!
        </p>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-4 col-lg-3 col-sm-6'>
                      <div className='single-service'>
                        <div className='part-1'>
                        <div className='service-icon text-center'>&#128680;</div>
                        <p className={`${styles.paragraph}`}>
          Every contestant will be notified of the results and you will be able
          to earn cash or tokens in realtime.
        </p>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-4 col-lg-3 col-sm-6'>
                      <div className='single-service'>
                        <div className='part-1'>
                        <div className='service-icon text-center'>&#128176;</div>
                        <p className={`${styles.paragraph}`}>
          All pay outs will be dispersed through one of our three channels.
          Winnings can be used for future gameplay.
          <span role='img' aria-label='Bulleye'>
            🎯‍
          </span>
        </p>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-4 col-lg-3 col-sm-6'>
                      <div className='single-service'>
                        <div className='part-1'>
                        <div className='service-icon text-center'>&#128233;</div>
                        <p className={`${styles.paragraph}`}>
          For all issues please email{' '}
          <a className={`${styles.link}`} href='mailto: info@clouty.io'>
            info@clouty.io
          </a>
          .
        </p>
                        </div>
                      </div>
                    </div>
                  </div>
      </div>
    </Wrapper>

);

export default Confirmation;
