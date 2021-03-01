import axios from 'axios';
import { GetServerSideProps } from 'next';
import absoluteUrl from 'next-absolute-url';
import React, { useRef, useState } from 'react';
import BigHeader from '../components/redesign/BigHeader';
import BigMoney from '../components/redesign/BigMoney';
import Description from '../components/redesign/Description';
import ModalBackground from '../components/redesign/ModalBackground';
import ModalButton from '../components/redesign/ModalButton';
import PageWrapper from '../components/redesign/PageWrapper';
import * as El from '../components/redesign/payouts/styles';
import { getCookie } from '../lib/session';

interface IProps {
  user: any;
}

const AMOUNTS = [50, 100, 250, 500, 1000];

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { origin } = absoluteUrl(ctx.req);
  const apiURL = `${origin}`;
  const user = getCookie('id_token', ctx.req);

  if (!user) {
    // Redirect logged out users to login page
    ctx.res.setHeader('Location', '/login');
    ctx.res.statusCode = 302;
    ctx.res.end();
  }
  const userRes = await axios.get(`${apiURL}/api/user/${user}`);
  const userObj = userRes.data;
  return { props: { user: userObj } };
};

const AddToBalance: React.FC<IProps> = (props: IProps) => {
  const [amount, setAmount] = useState(0);
  const sendRef = useRef(null);

  const addBalance = () => {
    if (!amount) return;
    (sendRef.current as any).click();
  };

  return (
    <PageWrapper active='Add to Balance' header='Step One' pageMode='modal'>
      <ModalBackground>
        <BigHeader>Add to Balance</BigHeader>
        <Description>Amount</Description>
        <BigMoney
          amount={amount}
          onEdit={(a: number) => setAmount(Math.min(a, 10000))}
        />
        <El.HorizontalScrollable>
          {AMOUNTS.map((a) => {
            return a === amount ? (
              <El.SelectedOption key={a}>${a}</El.SelectedOption>
            ) : (
              <El.Option onClick={() => setAmount(a)} key={a}>
                ${a}
              </El.Option>
            );
          })}
        </El.HorizontalScrollable>
        <div style={{ display: 'none' }}>
          <form action='https://api.connexus.fi/apiv1/bridge' method='post'>
            <input type='hidden' name='amount' value={Number(amount)} />
            <input type='hidden' name='customParm' value={props.user._id} />
            <input
              type='hidden'
              name='pluginKey'
              value='fa835a8d-9ea4-4ea5-89e7-6811e5cf3a71'
            />
            <input type='hidden' name='merchantTrackingNumber' value='clouty' />
            <div className='cxs-btn'>
              <button id='cxs-btn-default' type='submit' ref={sendRef}>
                <span id='cxs-span'>
                  <strong>PAY WITH</strong>
                </span>
              </button>
            </div>
          </form>
        </div>
        <ModalButton
          iconUri='/static/img/redesign/rightArrowLong.svg'
          onClick={addBalance}
          disabled={!amount}
        />
      </ModalBackground>
    </PageWrapper>
  );
};

export default AddToBalance;
