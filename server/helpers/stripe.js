const stripe = require('stripe')(process.env.STRIPE_SECRET_DEV);
const { parse } = require('url');
const { json } = require('micro');
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

const getUser = async (userId, db) => {
  return await db.collection(user).findOne({ _id: userId });
};
const updateStripeUser = async (userId, stripeUser, db) => {
  const newUser = await db.collection(user).findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        'stripe.user': stripeUser,
        updatedAt: Math.floor(new Date() / 1000),
      },
    },
    { returnOriginal: false },
  );
  return newUser.value;
};
const updateStripePayment = async (userId, stripeCard, db) => {
  const newUser = await db.collection(user).findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        'stripe.card': stripeCard,
        updatedAt: Math.floor(new Date() / 1000),
      },
    },
    { returnOriginal: false },
  );
  return newUser.value;
};

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
  if (data.type === 'payment_method.attached') {
    return updateStripePayment(
      data.data.object.metadata.userId,
      data.data.object,
      db,
    );
  }
  if (data.type === 'payment_intent.succeeded') {
    await stripe.customers.update(
      data.data.object.customer,
      {
        balance: data.data.object.amount,
      },
      (err, customer) => {
        if (err) return err;
        return updateStripeUser(data.data.object.metadata.userId, customer, db);
      },
    );
  }
  return '';
});
module.exports = { stripeApi, hookApi };
