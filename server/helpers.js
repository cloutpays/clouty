const connect = require('./helpers/db');
const cors = require('micro-cors')();
const nodemailer = require('nodemailer');
const client = require('twilio')(
  process.env.TWILIO_SID,
  process.env.TWILIO_TOKEN,
);
const dev =
  process.env.ENV === 'development' || process.env.NODE_ENV === 'development';
export const question = dev ? 'questiondev' : 'question';
export const cloutpays = dev ? 'cloutpaysdev' : 'cloutpays';
export const user = dev ? 'userdev' : 'user';
export const payout = dev ? 'payoutdev' : 'payout';
export const balance = dev ? 'balancedev' : 'balance';
export const stripeSecret = dev
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
    .collection('user')
    .find()
    .toArray();
  const questionsProd = await db
    .collection('question')
    .find()
    .toArray();
  const cloutpaysProd = await db
    .collection('cloutpays')
    .find()
    .toArray();
  const payoutsProd = await db
    .collection('payout')
    .find()
    .toArray();
  await db.collection('userdev').deleteMany();
  await db.collection('questiondev').deleteMany();
  await db.collection('cloutpaysdev').deleteMany();
  await db.collection('payoutdev').deleteMany();
  await db.collection('userdev').insertMany(usersProd);
  await db.collection('cloutpaysdev').insertMany(cloutpaysProd);
  await db.collection('questiondev').insertMany(questionsProd);
  await db.collection('payoutdev').insertMany(payoutsProd);
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
