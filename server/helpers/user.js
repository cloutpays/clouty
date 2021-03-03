import { newSubscriberContent, welcomeEmailContent } from '../emailTemplates';
import { sendEmail, user, wrapAsync } from '../helpers';
const { json } = require('micro');
const { parse } = require('url');

export const userRetrieveApi = wrapAsync(async function(req, db) {
  const { query } = parse(req.url, true);
  const { id } = query;
  return await db.collection(user).findOne({ _id: id });
});

export const newSubscriberApi = wrapAsync(async function(req) {
  const {
    query: { email },
  } = parse(req.url, true);
  return await sendEmail(['umeh@clouty.io'], newSubscriberContent, email);
});
export const updateUser = async (firebaseUser, db) => {
  const newUser = await db.collection(user).findOneAndUpdate(
    { _id: firebaseUser.firebase.uid },
    {
      $set: { ...firebaseUser, updatedAt: Math.floor(new Date() / 1000) },
    },
    { upsert: true, returnOriginal: false },
  );
  return newUser.value;
};

export const usersApi = wrapAsync(async function(req, db) {
  return await db
    .collection(user)
    .find({})
    .toArray();
});

export const userApi = wrapAsync(async function(req, db) {
  let { data: userData } = await json(req);
  const queryUser = await db
    .collection(user)
    .find({ _id: userData.firebase.uid })
    .toArray();

  if (userData.new) {
    userData.admin = false;

    await sendEmail([userData.firebase.email], welcomeEmailContent);
    userData.stripe = {
      user: { credit: 200, balance: 0 },
    };
    userData.new = false;
  }
  userData = { ...queryUser[0], ...userData };
  return await updateUser(userData, db);
});
