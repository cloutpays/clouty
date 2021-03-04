import { GetServerSideProps } from 'next';
import absoluteUrl from 'next-absolute-url';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import BigHeader from '../../components/redesign/BigHeader';
import BigMoney from '../../components/redesign/BigMoney';
import Description from '../../components/redesign/Description';
import ModalBackground from '../../components/redesign/ModalBackground';
import ModalButton from '../../components/redesign/ModalButton';
import ModalOverPage from '../../components/redesign/ModalOverPage';
import PageWrapper from '../../components/redesign/PageWrapper';
import * as El from '../../components/redesign/payouts/styles';
import { instance } from '../../lib/helpers';
import { getCookie } from '../../lib/session';

interface IProps {
  value: any;
  odds: any;
  user: any;
  id: any;
  bet: any;
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

  const userRes = await instance.get(`${apiURL}/api/user/${user}`);
  const userObj = userRes.data;

  const value = ctx.query.value;
  const odds = ctx.query.odds;
  const id = ctx.query.id;

  const betRes = await instance.get(`${apiURL}/api/question/${id}`);
  return { props: { user: userObj, value, odds, id, bet: betRes.data[0] } };
};

const StepTwo: React.FC<IProps> = (props: IProps) => {
  const { value, odds, user, id } = props;
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const router = useRouter();

  const tryToSetAmount = (a: number) => {
    if (a <= (user.stripe.user.balance + user.stripe.user.credit) / 100) {
      setAmount(a);
      setError('');
    } else {
      setError('Insufficient funds. Please enter a smaller amount.');
    }
  };

  const placeBet = async () => {
    setLoading(true);
    if (!value) return;

    const userSubmission = {
      email: user.firebase.email,
      answer: value,
      odds: odds,
      name: user.firstName,
      handle: user.info.firstName,
      userId: user._id,
      wager: amount,
      date: new Date(),
      question: id,
    };

    await instance({
      method: 'POST',
      url: '/api/submission',
      data: { userSubmission, user: props.user },
    });

    setModalOpen(true);
    setLoading(false);
  };
  const betText = loading ? 'Processing' : 'Place a Bet';
  return (
    <PageWrapper active='Our Active Bets' header='Step Two' pageMode='modal'>
      <ModalBackground>
        <BigHeader>Place a Bet</BigHeader>
        <Description style={{ fontWeight: 500 }}>Select your wager</Description>
        <BigMoney
          amount={amount}
          error={error.length > 0}
          onEdit={tryToSetAmount}
        />
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
        <ModalButton
          iconUri={!loading ? '/static/img/redesign/checkmark.svg' : ''}
          iconHeight={15}
          onClick={placeBet}
          disabled={!amount}>
          {loading && <i className='fa fa-spinner fa-spin' />} {betText}
        </ModalButton>
        <El.Error>{error}</El.Error>
      </ModalBackground>
      {modalOpen && (
        <ModalOverPage>
          <El.UpperOverlay src='/static/img/redesign/confetti.svg' />
          <El.InnerOver>
            <El.Header>Congratulations!</El.Header>
            <El.Info>You have placed</El.Info>
            <BigMoney amount={amount} />
            <El.Info>Your Answer</El.Info>
            <El.InfoSmall>{value || 'Bet'}</El.InfoSmall>
            <El.Info>Your Bet</El.Info>
            <El.InfoSmall>
              {props.bet.description || 'Bet description.'}
            </El.InfoSmall>
            <El.InnerSeparator />
            <ModalButton
              onClick={() => {
                //setModalOpen(false);
                router.push('/home');
              }}>
              Close
            </ModalButton>
          </El.InnerOver>
        </ModalOverPage>
      )}
    </PageWrapper>
  );
};

export default StepTwo;
