import { json } from 'micro';
import connect from './db';

const cors = require('micro-cors')();
const client = require('twilio')(
  process.env.TWILIO_SID,
  process.env.TWILIO_TOKEN,
);

const wrapAsync = (handler) => (req, res) =>
  handler(req)
    .then((result) => {
      res.setHeader(
        'cache-control',
        's-maxage=1 maxage=0, stale-while-revalidate',
      );
      return res.json(result);
    })
    .catch((error) => res.status(500).json({ error: error.message }));

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

const gameApi = wrapAsync(async (req) => {
  const data = await json(req);
  const { name, phoneNumber, wager } = data;

  // Set caching headers to serve stale content (if over a second old)
  // while revalidating fresh content in the background
  await sendTextMessage(name, phoneNumber, wager);
  const database = await connect();
  const collection =
    process.env.NODE_ENV !== 'development'
      ? await database.collection('cloutpays')
      : await database.collection('cloutpaysdev');
  console.log('collection', collection);
  const user = await collection.insertOne(data);
  return user;
});

module.exports = {
  gameApi: cors(gameApi),
};
