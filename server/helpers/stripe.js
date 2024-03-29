const { parse } = require('url');
const { json } = require('micro');
const redirect = require('micro-redirect');
const connect = require('./db');

import { ObjectId } from 'mongodb';
import { balance, payout, sendEmail, user, wrapAsync } from '../helpers';
import { payoutEmailContent } from '../emailTemplates';

import { updateUser } from './user';

export const processConnexusApi = async (req, res) => {
  const db = await connect();
  const queries = req.url.split('?')[1];
  const transaction = JSON.parse(
    '{"' +
      decodeURI(queries)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}',
  );
  const { CXStransactionAmount, customParm } = transaction;

  await db.collection(balance).insertOne(transaction);
  await db.collection(user).updateOne(
    { _id: customParm },
    {
      $inc: {
        'stripe.user.balance': parseInt(CXStransactionAmount) * 100,
      },
    },
    { returnOriginal: false },
  );
  const statusCode = 302;
  const location = '/user';
  return redirect(res, statusCode, location);
};

export const getAllTransactionsApi = wrapAsync(async (req, db) => {
  return db
    .collection(balance)
    .find()
    .toArray();
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
