import 'cleave.js/dist/addons/cleave-phone.us';
import Cleave from 'cleave.js/react';
import React, { useState } from 'react';

interface UserInfoProps {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

const UserInfoForm: React.FC<UserInfoProps> = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  // const [handle, setHandle] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  return (
    <form className='measure center'>
      <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
        <div className='mt1'>
          <label className='db fw6 lh-copy f6' htmlFor='first-name'>
            First Name
          </label>
          <input
            className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
            type='name'
            value={firstName}
            onChange={(event) => setFirstName(event.currentTarget.value)}
          />
        </div>
        <div className='mt1'>
          <label className='db fw6 lh-copy f6' htmlFor='last-name'>
            Last Name
          </label>
          <input
            className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
            type='name'
            value={lastName}
            onChange={(event) => setLastName(event.currentTarget.value)}
          />
        </div>
        <div className='mv3'>
          <label className='db fw6 lh-copy f6' htmlFor='password'>
            Email Address
          </label>
          <input
            className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
            type='email'
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
          />
        </div>
        <div className='mv3'>
          <label className='db fw6 lh-copy f6' htmlFor='password'>
            Phone Number
          </label>
          <Cleave
            className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
            onChange={(event) => setPhoneNumber(event.currentTarget.value)}
            value={phoneNumber}
            options={{ phone: true, phoneRegionCode: 'US' }}
          />
        </div>
      </fieldset>
      <div className=''>
        <input
          className=' f6 no-underline fw5 mt3 br2 ph3 pv2 dib ba b--blue blue bg-white hover-bg-blue hover-white'
          type='submit'
          value='Update'
          //   onClick={handleLogin}
        />
      </div>
    </form>
  );
};

export default UserInfoForm;
