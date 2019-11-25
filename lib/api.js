const express = require('express');
const { json } = require('micro');
module.exports = db => {
  const router = express.Router();
  // Wrap an async function so we catch any errors that might occur
  const wrapAsync = handler => (req, res) =>
    handler(req)
      .then(result => res.json(result))
      .catch(error => res.status(500).json({ error: error.message }));

  router.post(
    '/game',
    wrapAsync(async function(req) {
      const data = await json(req);
      console.log(data);
      // Set caching headers to serve stale content (if over a second old)
      // while revalidating fresh content in the background

      const collection = await db.collection('cloutpays');

      const user = await collection.insertOne(data);
      return user;

      // Respond with a JSON string
    }),
  );
  return router;
};
