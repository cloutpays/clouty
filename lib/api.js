const express = require('express');
const { json } = require('micro');
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = require('twilio')(accountSid, authToken);

module.exports = (db) => {
  const router = express.Router();
  // Wrap an async function so we catch any errors that might occur
  const wrapAsync = (handler) => (req, res) =>
    handler(req)
      .then((result) => res.json(result))
      .catch((error) => res.status(500).json({ error: error.message }));

  router.post(
    '/game',
    wrapAsync(async function(req) {
      const data = await json(req);
      console.log(data);
      // Set caching headers to serve stale content (if over a second old)
      // while revalidating fresh content in the background
      client.messages
        .create({
          body: `Thank you for signing up to Clouty! Here is the final step to secure your bet https://cash.app/$getclouty/${data.wager}`,
          from: '+15103302064',
          to: data.phoneNumber,
        })
        .then((message) => {
          console.log(message.sid);
        });

      const collection = await db.collection('cloutpays');

      const user = await collection.insertOne(data);
      return user;

      // Respond with a JSON string
    }),
  );
  return router;
};
