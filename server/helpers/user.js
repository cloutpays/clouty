const { json } = require('micro');
const { parse } = require('url');
const cors = require('micro-cors')();
const stripe = require('stripe')(process.env.STRIPE_SECRET_PROD);
const nodemailer = require('nodemailer');
import { emailContent, user, wrapAsync } from '../helpers';

const userRetrieveApi = wrapAsync(async function(req, db) {
  const { query } = parse(req.url, true);
  const { id } = query;
  return await db.collection(user).findOne({ _id: id });
});

const sendEmail = async (email) => {
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
    const message = emailContent;

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"Clouty" <info@clouty.io>`, // sender address
      to: email, // list of receivers
      subject: 'Welcome to Clouty', // Subject line
      text: message, // plain text body
      html: message, // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  } catch (error) {
    console.error(error);
  }
};

const updateUser = async (firebaseUser, db) => {
  const newUser = await db.collection(user).findOneAndUpdate(
    { _id: firebaseUser.firebase.uid },
    {
      $set: { ...firebaseUser, updatedAt: Math.floor(new Date() / 1000) },
    },
    { upsert: true, returnOriginal: false },
  );
  return newUser.value;
};

const usersApi = wrapAsync(async function(req, db) {
  return await db
    .collection(user)
    .find({})
    .toArray();
});

const userApi = wrapAsync(async function(req, db) {
  let userData = (await json(req)).data;
  const queryUser = await db
    .collection(user)
    .find({ _id: userData.firebase.uid })
    .toArray();

  if (userData.new) {
    await sendEmail(userData.firebase.email);
    const stripeUser = await stripe.customers.create({
      email: userData.firebase.email,
    });

    userData.stripe = {
      user: { ...stripeUser, balance: 500 },
    };
    userData.new = false;
  }
  userData = { ...queryUser[0], ...userData };
  return await updateUser(userData, db);
});

module.exports = {
  userApi: cors(userApi),
  userRetrieveApi: cors(userRetrieveApi),
  updateUser,
  usersApi,
};
