const { json, send } = require('micro');
const connect = require('./db');
const { parse } = require('url');
const ObjectId = require('mongodb').ObjectId;
const cors = require('micro-cors')();

const wrapAsync = handler => (req, res) =>
  handler(req)
    .then(result => {
      res.setHeader(
        'cache-control',
        's-maxage=1 maxage=0, stale-while-revalidate',
      );
      return res.json(result);
    })
    .catch(error => res.status(500).json({ error: error.message }));

const gameApi = wrapAsync(async function(req) {
  const data = await json(req);
  console.log(data);
  // Set caching headers to serve stale content (if over a second old)
  // while revalidating fresh content in the background

  const database = await connect();
  const collection = await database.collection('cloutpays');

  const user = await collection.insertOne(data);
  return user;

  // Respond with a JSON string
});

module.exports = {
  gameApi: cors(gameApi),
};
