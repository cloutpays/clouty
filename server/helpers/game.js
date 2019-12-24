import { json } from 'micro';
import connect from './db';
const { parse } = require('url');

const cors = require('micro-cors')();
const client = require('twilio')(
  process.env.TWILIO_SID,
  process.env.TWILIO_TOKEN,
);

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

const sendTextMessage = async (name, phoneNumber, wager) => {
  try {
    const message = await client.messages.create({
      body: `Thank you for signing up to Clouty ${name}! Here is the final step to secure your bet https://cash.app/$getclouty/${wager}`,
      from: '+14154172439',
      to: phoneNumber,
    });
    console.log(`Request sent: ${message.sid} - ${name}`);
  } catch (error) {
    console.error(error);
  }
};

const gameSubmitApi = wrapAsync(async (req, db) => {
  const data = await json(req);
  const { name, phoneNumber, wager } = data;

  // Set caching headers to serve stale content (if over a second old)
  // while revalidating fresh content in the background
  await sendTextMessage(name, phoneNumber, wager);
  const collection =
    process.env.NODE_ENV !== 'development'
      ? await db.collection('cloutpays')
      : await db.collection('cloutpaysdev');
  const user = await collection.insertOne(data);
  return user;
});

const submissionsRetrieveApi = wrapAsync(async (req, db) => {
  return await db
    .collection('cloutpays')
    .find()
    .toArray();
});
const questionSubmitApi = wrapAsync(async (req, db) => {
  const data = await json(req);
  const collection = db.collection('question');
  const question = await collection.insertOne(data);
  return question;
});
const questionsRetrieveApi = wrapAsync(async (req, db) => {
  return await db
    .collection('question')
    .find()
    .toArray();
});
const questionRetrieveApi = wrapAsync(async (req, db) => {
  const { query } = parse(req.url, true);
  const id = query.id;
  return await db
    .collection('question')
    .find({ slug: id })
    .toArray();
});
const questionRemoveApi = wrapAsync(async (req, db) => {
  const { query } = parse(req.url, true);
  console.log('id', query);
  const id = query.id;
  return await db.collection('question').remove({ slug: id });
});
module.exports = {
  gameSubmitApi: cors(gameSubmitApi),
  submissionsRetrieveApi: cors(submissionsRetrieveApi),
  questionsRetrieveApi: cors(questionsRetrieveApi),
  questionRetrieveApi: cors(questionRetrieveApi),
  questionSubmitApi: cors(questionSubmitApi),
  questionRemoveApi: cors(questionRemoveApi),
};
