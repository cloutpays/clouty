import React, { useState } from 'react';
import { getCurrentYear, instance } from '../../lib/helpers';

interface DarkModeProps {
  darkMode: boolean;
}
const Footer: React.FC<DarkModeProps> = () => {
  // const setDarkMode = () => {
  //   setCookie('dark_mode', !darkMode);
  //   window.location.href = '/';
  // };
  const [emailAddress, setEmailAddress] = useState('');
  const [submit, setSubmit] = useState(false);

  const sendEmail = async (email: string) => {
    setSubmit(true);
    instance.post(`/api/newSub/${email}`);
    setEmailAddress('');
  };

  return (
    <footer id='footer' className='footer-1'>
      <div className='main-footer widgets-dark typo-light'>
        <div className='container'>
          <div className='footer-flex'>
            <div className='contact'>
              <div className='widget subscribe no-box'>
                <h5 className='widget-title'>
                  Be the first to know
                  <span />
                </h5>
                <p>
                  Clouty aims to be &quot;DCM&quot;, under CFTC jurisdiction,
                  pending approval. Be the first to find out about the latest
                  when you sign up for our newsletter. Short reads and no spam.
                </p>
                <label className='footer-input-label'>Email address</label>
                <div className='input-group mb-3'>
                  <input
                    type='text'
                    className='form-control footer-input'
                    value={emailAddress}
                    onChange={(event) => {
                      setSubmit(false);
                      setEmailAddress(event.target.value);
                    }}
                  />
                  <div className='input-group-append'>
                    <button
                      onClick={() => sendEmail(emailAddress)}
                      className='text-white input-group-text submit-btn-footer'>
                      {` ${submit ? 'Thank you!' : 'Submit'} `}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='folow'>
              <div className='widget no-box'>
                <h5 className='widget-title'>
                  Follow Us
                  <span />
                </h5>
                <ul className='social-footer2'>
                  <li className=''>
                    <a target='_blank' href='https://instagram.com/clouty.io'>
                      <i className='fa fa-instagram' />
                    </a>
                  </li>
                  <li className=''>
                    <a href='https://twitter.com/cloutyio' target='_blank'>
                      <i className='fa fa-twitter' />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className='mobile-disp'>
              <div className='pages'>
                <div className='widget no-box'>
                  <ul className='thumbnail-widget'>
                    <li>
                      <div className='thumb-content'>
                        <a href='/'>Home</a>
                      </div>
                    </li>
                    <li>
                      <div className='thumb-content'>
                        <a href='/about'>About</a>
                      </div>
                    </li>
                    <li>
                      <div className='thumb-content'>
                        <a href='/games'>Games</a>
                      </div>
                    </li>
                    {/* <li>
                      <div className='thumb-content'>
                        <a href='/signup'>Sign Up</a>
                      </div>
                    </li> */}
                    <li>
                      <div className='thumb-content'>
                        <a href='/login'>Log In</a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='links'>
                <div className='widget no-box'>
                  <ul className='thumbnail-widget'>
                    <li>
                      <div className='thumb-content'>
                        <a href='/faq'>FAQ</a>
                      </div>
                    </li>
                    <li>
                      <div className='thumb-content'>
                        <a href='/terms'>Terms</a>
                      </div>
                    </li>
                    <li>
                      <div className='thumb-content'>
                        <a href='/terms'>Privacy Policy</a>
                      </div>
                    </li>
                    <li>
                      <div className='thumb-content'>
                        <a href='https://clouty.substack.com/'>Newsletter</a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='logo'>
              <div className='widget no-box justify-between widget-footer'>
                <img height='80' src='/static/img/new/logo-web.svg' />
                <p className='footer-copyright-content'>
                  © Clouty {getCurrentYear}. <br />
                  © Clouty 2021. <br />
                  Packaged with care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
