const stripe = require('stripe')(process.env.STRIPE_SECRET_PROD);
const { parse } = require('url');
const { json } = require('micro');
import { ObjectId } from 'mongodb';
import { payout, user, wrapAsync } from '../helpers';
import { updateUser } from './user';

const getUser = async (userId, db) => {
  return await db.collection(user).findOne({ _id: userId });
};

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
const payoutApi = wrapAsync(async (req, db) => {
  const data = (await json(req)).data;
  let { user, payoutRequest } = data;
  console.log(payoutRequest, 'd');
  if (user) {
    user.stripe.user.balance = payoutRequest.newBalance;
    await updateUser(user, db);
  }
  if (payoutRequest._id) {
    const _id = payoutRequest._id;
    delete payoutRequest._id;
    return await db
      .collection(payout)
      .update({ _id: ObjectId(_id) }, payoutRequest);
  } else {
    return await db.collection(payout).insertOne(payoutRequest);
  }
});
const payoutsByUserApi = wrapAsync(async (req, db) => {
  const { query } = parse(req.url, true);
  const { id } = query;
  return await db
    .collection(payout)
    .find({ userId: id })
    .toArray();
});
const allPayoutsApi = wrapAsync(async (req, db) => {
  return await db
    .collection(payout)
    .find()
    .toArray();
});

const stripeApi = wrapAsync(async (req, db) => {
  const { query } = parse(req.url, true);
  const { id, userId } = query;

  const customer = await getUser(userId, db);
  const session = await stripe.checkout.sessions.create({
    customer: customer.stripe.user.id,
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
    cancel_url: 'https://example.com/cancel',
  });

  return session;
});

const hookApi = wrapAsync(async (req, db) => {
  const data = await json(req);
  switch (data.type) {
    case 'payment_intent.succeeded':
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
module.exports = {
  stripeApi,
  hookApi,
  payoutApi,
  payoutsByUserApi,
  allPayoutsApi,
};
