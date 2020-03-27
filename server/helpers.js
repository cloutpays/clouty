const connect = require('./helpers/db');
const cors = require('micro-cors')();
const nodemailer = require('nodemailer');
const client = require('twilio')(
  process.env.TWILIO_SID,
  process.env.TWILIO_TOKEN,
);
const dev =
  process.env.ENV === 'development' || process.env.NODE_ENV === 'development';
const staging = process.env.ENV === 'staging';
export const question = dev
  ? 'question_dev'
  : staging
  ? 'question_staging'
  : 'question_prod';
export const cloutpays = dev
  ? 'cloutpays_dev'
  : staging
  ? 'cloutpays_staging'
  : 'cloutpays_prod';
export const user = dev ? 'user_dev' : staging ? 'user_staging' : 'user_prod';
export const payout = dev
  ? 'payout_dev'
  : staging
  ? 'payout_staging'
  : 'payout_prod';
export const balance = dev
  ? 'balance_dev'
  : staging
  ? 'balance_staging'
  : 'balance_prod';
export const stripeSecret =
  dev || staging
    ? process.env.STRIPE_SECRET_DEV
    : process.env.STRIPE_SECRET_PROD;

export const wrapAsync = (handler) => async (req, res) => {
  const db = await connect();
  return cors(
    handler(req, db)
      .then((result) => {
        res.setHeader(
          'cache-control',
          's-maxage=1 maxage=0, stale-while-revalidate',
        );
        return res.json(result);
      })
      .catch((error) => res.status(500).json({ error: error.message })),
  );
};
export const dbRefresh = wrapAsync(async (req, db) => {
  const usersProd = await db
    .collection('user_prod')
    .find()
    .toArray();
  const questionsProd = await db
    .collection('question_prod')
    .find()
    .toArray();
  const cloutpaysProd = await db
    .collection('cloutpays_prod')
    .find()
    .toArray();
  const payoutsProd = await db
    .collection('payout_prod')
    .find()
    .toArray();
  const balancesProd = await db
    .collection('balance_prod')
    .find()
    .toArray();

  // staging db
  await db.collection('user_staging').deleteMany();
  await db.collection('question_staging').deleteMany();
  await db.collection('cloutpays_staging').deleteMany();
  await db.collection('payout_staging').deleteMany();
  await db.collection('balance_staging').deleteMany();

  await db.collection('user_staging').insertMany(usersProd);
  await db.collection('cloutpays_staging').insertMany(cloutpaysProd);
  await db.collection('question_staging').insertMany(questionsProd);
  await db.collection('payout_staging').insertMany(payoutsProd);
  await db.collection('balance_staging').insertMany(balancesProd);

  // dev dbs
  await db.collection('question_dev').deleteMany();
  await db.collection('payout_dev').deleteMany();
  await db.collection('cloutpays_dev').deleteMany();
  await db.collection('balance_dev').deleteMany();

  await db.collection('question_dev').insertMany(questionsProd);
  await db.collection('balance_dev').insertMany(balancesProd);

  return true;
});
export const sendEmail = async (email, content) => {
  try {
    // Generate test SMTP service account from ethereal.email

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp-relay.sendinblue.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'ebrima.jobe92@gmail.com', // generated ethereal user
        pass: process.env.NODEMAILER, // generated ethereal password
      },
    });
    const message = content.content;
    for (var key in email) {
      await transporter.sendMail({
        from: `"Clouty" <info@clouty.io>`, // sender address
        to: email[key], // list of receivers
        subject: content.subject, // Subject line
        text: message, // plain text body
        html: message, // html body
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const sendTextMessage = async (name, type, phoneNumber) => {
  const body = {
    winner: `✅ Congratulations, you came out on top! Your earnings have been added to your balance 🏆`,
    loss: `🎲 Unfortunately, your prediction was inaccurate. Better luck next time! 🎰`,
    confirm: `Thank you for placing a bet on Clouty ${name}! This is confirmation that your wager is secure. Let the games begin`,
  };
  try {
    const message = await client.messages.create({
      body: body[type],

      from: '+14154172439',
      to: phoneNumber,
    });
    console.log(`Request sent: ${message.sid} - ${name}`);
  } catch (error) {
    console.error(error);
  }
};
