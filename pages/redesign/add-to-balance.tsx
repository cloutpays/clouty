import axios from 'axios';
import { GetServerSideProps } from 'next';
import absoluteUrl from 'next-absolute-url';
import React, { useState } from 'react';
import BigHeader from '../../components/redesign/BigHeader';
import BigMoney from '../../components/redesign/BigMoney';
import Description from '../../components/redesign/Description';
import ModalBackground from '../../components/redesign/ModalBackground';
import ModalButton from '../../components/redesign/ModalButton';
import PageWrapper from '../../components/redesign/PageWrapper';
import * as El from '../../components/redesign/payouts/styles';
import { getCookie } from '../../lib/session';

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

const AddToBalance: React.FC<IProps> = () => {
  const [amount, setAmount] = useState(0);

  const addBalance = () => {
    //todo
  };

  return (
    <PageWrapper active='Add to Balance' header='Step One' pageMode='modal'>
      <ModalBackground>
        <BigHeader>Add to Balance</BigHeader>
        <Description>Amount</Description>
        <BigMoney amount={amount} />
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
        <ModalButton
          iconUri='/static/img/redesign/rightArrowLong.svg'
          onClick={addBalance}
        />
      </ModalBackground>
    </PageWrapper>
  );
};

export default AddToBalance;
