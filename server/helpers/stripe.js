const stripe = require('stripe')(stripeSecret);
const { parse } = require('url');
const { json } = require('micro');
import { ObjectId } from 'mongodb';
import {
  balance,
  payout,
  sendEmail,
  stripeSecret,
  user,
  wrapAsync,
} from '../helpers';
import { payoutEmailContent } from '../emailTemplates';

import { updateUser } from './user';

const updateStripeUser = async (paymentIntent, db) => {
  const newUser = await db.collection(user).updateOne(
    { _id: paymentIntent.metadata.userId },
    {
      $inc: {
        'stripe.user.balance': paymentIntent.amount,
      },
    },
    { returnOriginal: false },
  );
  return newUser.value;
};

export const getAllTransactionsApi = wrapAsync(async () => {
  const charges = [];
  await stripe.charges
    .list({ limit: 100, created: { gt: 1584300632 } })
    .autoPagingEach(function(charge) {
      charges.push(charge);
    });
  return charges;
});

export const setCreditApi = wrapAsync(async (req, db) => {
  const {
    data: { credit },
  } = await json(req);
  return await db.collection(user).updateOne(
    { _id: credit.userId },
    {
      $set: {
        'stripe.user.credit': credit.credit,
        'stripe.user.balance': credit.balance,
        edited: true,
      },
    },
  );
});

export const getUserTransactionsApi = wrapAsync(async (req, db) => {
  const { query } = parse(req.url, true);
  const { id } = query;
  return db
    .collection(balance)
    .find({ 'metadata.userId': id })
    .toArray();
});

// export const payoutRefundApi = wrapAsync(async (req, db) => {
//   const { query } = parse(req.url, true);
//   const { id } = query;
// });
export const payoutApi = wrapAsync(async (req, db) => {
  const {
    data: { user, payoutRequest },
  } = await json(req);
  if (user) {
    user.stripe.user.balance = payoutRequest.newBalance;
    await updateUser(user, db);
  }

  //if updating existing request
  if (payoutRequest._id) {
    const { _id } = payoutRequest;
    delete payoutRequest._id;
    await sendEmail([payoutRequest.email], payoutEmailContent);
    return await db
      .collection(payout)
      .updateOne({ _id: ObjectId(_id) }, { $set: payoutRequest });
  }
  //creating new payout request
  else {
    return await db.collection(payout).insertOne(payoutRequest);
  }
});

export const payoutsByUserApi = wrapAsync(async (req, db) => {
  const { query } = parse(req.url, true);
  const { id } = query;
  return await db
    .collection(payout)
    .find({ userId: id })
    .toArray();
});

export const allPayoutsApi = wrapAsync(async (req, db) => {
  return await db
    .collection(payout)
    .find()
    .toArray();
});

export const stripeApi = wrapAsync(async (req) => {
  const { query } = parse(req.url, true);
  const { id, userId } = query;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    payment_intent_data: {
      metadata: {
        userId,
      },
    },
    line_items: [
      {
        name: 'Clouty Pays',
        description: 'Add to balance',
        images: ['https://getclouty.com/static/img/clouty-04.png'],
        amount: parseInt(id) * 100,
        currency: 'usd',
        quantity: 1,
      },
    ],
    success_url: `http://${req.headers.host}/user`,
    cancel_url: `http://${req.headers.host}/user/balance`,
  });

  return session;
});

export const hookApi = wrapAsync(async (req, db) => {
  const data = await json(req);
  switch (data.type) {
    case 'payment_intent.succeeded':
      await db.collection(balance).insertOne(data.data.object);
      await stripe.customers.update(
        data.data.object.customer,
        {
          balance: data.data.object.amount,
        },
        (err) => {
          if (err) return err;
        },
      );
      return updateStripeUser(data.data.object, db);
    default:
      return true;
  }
});
