import { ObjectId } from 'mongodb';
import { json } from 'micro';
import { updateUser } from './user';
const { parse } = require('url');

import {
  cloutpays,
  dev,
  question,
  sendTextMessage,
  user,
  wrapAsync,
} from '../helpers';

const handlePayouts = async (entries, db) => {
  const modifiedUsers = entries.map((entry) => {
    return {
      _id: entry.userId,
      amount: entry.wager * 200,
    };
  });

  let users = await db
    .collection(user)
    .find({
      _id: {
        $in: entries.map((entry) => {
          console.log('yo', entry.userId);
          return entry.userId;
        }),
      },
    })
    .toArray();
  users = users.map((user) => {
    const { stripe } = user;
    return {
      ...user,
      stripe: {
        ...stripe,
        user: {
          ...stripe.user,
          balance:
            stripe.user.balance +
            modifiedUsers.filter((modUser) => {
              return user._id === modUser._id;
            })[0].amount,
        },
      },
    };
  });
  let ops = [];
  users.forEach((user) => {
    ops.push({
      updateOne: {
        filter: { _id: user._id },
        update: {
          $set: user,
        },
      },
    });
  });
  return await db.collection(user).bulkWrite(ops);
};

const updateSubmissions = async (entries, answer, db) => {
  try {
    let ops = [];
    entries.forEach((entry) => {
      if (!answer) {
        ops.push({
          updateOne: {
            filter: { _id: entry._id },
            update: { $unset: { won: '' } },
          },
        });
      } else {
        ops.push({
          updateOne: {
            filter: { _id: entry._id },
            update: { $set: { won: entry.answer === answer } },
          },
        });
      }
    });
    return await db.collection(cloutpays).bulkWrite(ops);
  } catch (err) {
    return console.log(err);
  }
};
export const gameSubmitApi = wrapAsync(async (req, db) => {
  const data = await json(req);
  const { wager, phoneNumber, name } = data.userSubmission;
  const { user } = data;
  const { balance } = user.stripe.user;
  user.stripe.user.balance = balance - wager * 100;
  await updateUser(user, db);
  if (!dev) {
    await sendTextMessage(name, 'confirm', phoneNumber);
  }
  return await db.collection(cloutpays).insertOne(data.userSubmission);
});

export const submissionsRemovalApi = wrapAsync(async (req, db) => {
  const { query } = parse(req.url, true);
  const { id } = query;
  console.log(id);
  return await db.collection(cloutpays).remove({ _id: ObjectId(id) });
});
export const submissionsRetrieveApi = wrapAsync(
  async (req, db) =>
    await db
      .collection(cloutpays)
      .find()
      .toArray(),
);
export const userSubmissionsRetrieveApi = wrapAsync(async (req, db) => {
  const { query } = parse(req.url, true);
  const { id } = query;
  return await db
    .collection(cloutpays)
    .find({ userId: id })
    .toArray();
});

export const questionCloseApi = wrapAsync(async (req, db) => {
  const { query } = parse(req.url, true);
  const id = query.id;
  await db
    .collection(question)
    .update({ question: id }, { $set: { endDate: new Date() } });
});
export const questionSubmitApi = wrapAsync(async (req, db) => {
  const data = await json(req);
  const entries = await db
    .collection(cloutpays)
    .find({ question: data.question })
    .toArray();
  if (data.answer) {
    const payoutUsers = entries.filter((entry) => {
      return entry.answer === data.answer;
    });
    if (payoutUsers.length > 0) {
      await handlePayouts(payoutUsers, db);
    }
  }
  if (entries.length > 0) {
    await updateSubmissions(entries, data.answer, db);
  }
  return await db
    .collection(question)
    .findOneAndReplace({ slug: data.slug }, data, { upsert: true });
});

export const userQuestionSubmitApi = wrapAsync(async (req, db) => {
  const data = await json(req);
  return await db
    .collection('userquestion')
    .findOneAndReplace({ slug: data.slug }, data, { upsert: true });
});

export const questionsRetrieveApi = wrapAsync(
  async (req, db) =>
    await db
      .collection(question)
      .find()
      .toArray(),
);

export const questionRetrieveApi = wrapAsync(async (req, db) => {
  const { query } = parse(req.url, true);
  const id = query.id;
  return await db
    .collection(question)
    .find({ slug: id })
    .toArray();
});

export const questionRemoveApi = wrapAsync(async (req, db) => {
  const { query } = parse(req.url, true);
  const id = query.id;
  return await db.collection(question).removeOne({ slug: id });
});
