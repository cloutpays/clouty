import React from 'react';

interface DarkModeProps {
  darkMode: boolean;
}
const Footer: React.FC<DarkModeProps> = () => {
  // const setDarkMode = () => {
  //   setCookie('dark_mode', !darkMode);
  //   window.location.href = '/';
  // };

  return (
    <footer id='footer' className='footer-1'>
      <div className='main-footer widgets-dark typo-light'>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-sm-6 col-md-3'>
              <div className='widget subscribe no-box'>
                <h5 className='widget-title'>
                  Be the first to know
                  <span />
                </h5>
                <p>
                  Be the first to find out about the latest bets when you sign
                  up for our newsletter. Short reads and no spam.
                </p>
                <div className='input-group mb-3'>
                  <input
                    style={{
                      color: 'black',
                      background: '#111111 0% 0% no-repeat paddinBox',
                      opacity: 0.15,
                    }}
                    type='text'
                    className='form-control'
                  />
                  <div className='input-group-append'>
                    <span
                      style={{ background: '#692699' }}
                      className='text-white input-group-text'>
                      {' '}
                      Submit{' '}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-xs-12 col-sm-6 col-md-2'>
              <div className='widget no-box'>
                <h5 className='widget-title'>
                  Follow Us
                  <span />
                </h5>
                <ul className='social-footer2'>
                  <li className=''>
                    <a target='_blank' href='#'>
                      <i className='fa fa-instagram' />
                    </a>
                  </li>
                  <li className=''>
                    <a href='#' target='_blank'>
                      <i className='fa fa-twitter' />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className='col-xs-12 col-sm-6 col-md-2'>
              <div className='widget no-box'>
                <ul className='thumbnail-widget'>
                  <li>
                    <div className='thumb-content'>
                      <a href="{{ route('sign_up.option') }}">Home</a>
                    </div>
                  </li>
                  <li>
                    <div className='thumb-content'>
                      <a href="{{ route('teacher.find') }}">About</a>
                    </div>
                  </li>
                  <li>
                    <div className='thumb-content'>
                      <a href="{{ route('discussion.index') }}">Games</a>
                    </div>
                  </li>
                  <li>
                    <div className='thumb-content'>
                      <a href="{{ route('discussion.index') }}">Sign Up</a>
                    </div>
                  </li>
                  <li>
                    <div className='thumb-content'>
                      <a href='#.'>Log In</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className='col-xs-12 col-sm-6 col-md-2'>
              <div className='widget no-box'>
                <ul className='thumbnail-widget'>
                  <li>
                    <div className='thumb-content'>
                      <a href="{{ route('sign_up.option') }}">FAQ</a>
                    </div>
                  </li>
                  <li>
                    <div className='thumb-content'>
                      <a href="{{ route('teacher.find') }}">Terms</a>
                    </div>
                  </li>
                  <li>
                    <div className='thumb-content'>
                      <a href="{{ route('discussion.index') }}">
                        Privacy Policy
                      </a>
                    </div>
                  </li>
                  <li>
                    <div className='thumb-content'>
                      <a href="{{ route('discussion.index') }}">Newsletter</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className='col-xs-12 col-sm-6 col-md-2'>
              <div className='widget no-box'>
                <h5 className='widget-title mt-3'>
                  Logo
                  <span />
                </h5>
                <p>© Clouty 2020 Packaged with care.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
