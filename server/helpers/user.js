const { json } = require('micro');
const cors = require('micro-cors')();
const connect = require('./db');

const dev = process.env.NODE_ENV === 'development';
const user = dev ? 'userdev' : 'user';

const wrapAsync = (handler) => async (req, res) => {
  const db = await connect();
  return handler(req, db)
    .then((result) => {
      res.setHeader(
        'cache-control',
        's-maxage=1 maxage=0, stale-while-revalidate',
      );
      return res.json(result);
    })
    .catch((error) => res.status(500).json({ error: error.message }));
};
const updateUser = async (firebaseUser, db) => {
  const newUser = await db.collection(user).findOneAndUpdate(
    { _id: firebaseUser.uid },
    {
      $set: { ...firebaseUser, updatedAt: Math.floor(new Date() / 1000) },
    },
    { upsert: true, returnOriginal: false },
  );
  return newUser.value;
};
const userApi = wrapAsync(async function(req, db) {
  const user = (await json(req)).data;
  console.log(user);
  return updateUser(user, db);
});

module.exports = {
  userApi: cors(userApi),
};
