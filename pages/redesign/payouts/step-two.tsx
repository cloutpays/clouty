import axios from 'axios';
import { GetServerSideProps } from 'next';
import absoluteUrl from 'next-absolute-url';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import BigHeader from '../../../components/redesign/BigHeader';
import BigMoney from '../../../components/redesign/BigMoney';
import Description from '../../../components/redesign/Description';
import ModalBackground from '../../../components/redesign/ModalBackground';
import ModalButton from '../../../components/redesign/ModalButton';
import PageWrapper from '../../../components/redesign/PageWrapper';
import * as El from '../../../components/redesign/payouts/styles';
import { getCookie } from '../../../lib/session';

interface IProps {
  user: any;
}

const AMOUNTS = [50, 100, 250, 500, 1000];

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { origin } = absoluteUrl(ctx.req);
  const apiURL = `${origin}`;
  const user = getCookie('id_token', ctx.req);

  const userRes = await axios.get(`${apiURL}/api/user/${user}`);
  const userObj = userRes.data;
  return { props: { user: userObj } };
};

const StepTwo: React.FC<IProps> = (props: IProps) => {
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { user } = props;

  const tryToSetAmount = (target: number) => {
    if ((user.stripe.user.balance || 0) < target) {
      setError('Insufficient funds. Please enter a smaller amount.');
    } else {
      setError('');
      setAmount(target);
    }
  };

  if (!router.query.choice || !router.query.target) {
    router.push('/redesign/payouts/step-one');
  }

  const choiceMap = (choice?: any) => {
    switch (choice) {
      case 'paypal':
        return 'PayPal';
      case 'cashapp':
        return 'Cash App';
      case 'applepay':
        return 'Apple Pay';
      default:
        // console.log(
        //   'Error with mapping payment choice:',
        //   choice,
        //   'is not valid!',
        // );
        return undefined;
    }
  };

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    const date = new Date();
    const userSubmission = {
      user: {
        ...user,
        info: {
          ...user.info,
          payout: {
            email: router.query.choice === 'paypal' && router.query.target,
            handle: router.query.choice === 'cashapp' && router.query.target,
            appleID: router.query.choice === 'applepay' && router.query.target,
            preferred: choiceMap(router.query.choice),
            lastUpdated: date,
          },
        },
      },
      payoutRequest: {
        userId: user._id,
        email: router.query.choice === 'paypal' && router.query.target,
        handle: router.query.choice === 'cashapp' && router.query.target,
        appleID: router.query.choice === 'applepay' && router.query.target,
        preferred: choiceMap(router.query.choice),
        cleared: false,
        amount,
        previousBalance: user.stripe.user.balance,
        newBalance: user.stripe.user.balance - amount * 100,
        date,
      },
    };
    await axios({
      method: 'post',
      url: '/api/payout',
      data: { data: userSubmission },
    }).then(() => {
      router.push('/payouts/confirm');
      setLoading(false);
    });
  };

  return (
    <PageWrapper active='Payouts' header='Step Two' pageMode='modal'>
      <ModalBackground>
        <BigHeader>Set up a Payout</BigHeader>
        <Description>Payout Amount</Description>
        <BigMoney amount={amount} onEdit={tryToSetAmount} />
        <El.HorizontalScrollable>
          {AMOUNTS.map((a) => {
            return a === amount ? (
              <El.SelectedOption key={a}>${a}</El.SelectedOption>
            ) : (
              <El.Option onClick={() => tryToSetAmount(a)} key={a}>
                ${a}
              </El.Option>
            );
          })}
        </El.HorizontalScrollable>
        <El.Error>{error}</El.Error>
        <ModalButton
          iconUri='/static/img/redesign/rightArrowLong.svg'
          disabled={!amount || error.length > 0}
        />
      </ModalBackground>
    </PageWrapper>
  );
};

export default StepTwo;
