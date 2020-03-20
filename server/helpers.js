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

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"Clouty" <info@clouty.io>`, // sender address
      to: email, // list of receivers
      subject: content.subject, // Subject line
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

export const welcomeEmailContent = {
  subject: `Welcome To Clouty`,
  content: `<div
  valign="top"
  class="headerContainer"
  style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
>
  <table
    border="0"
    cellpadding="0"
    cellspacing="0"
    width="100%"
    class="mcnImageBlock"
    style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
  >
    <tbody class="mcnImageBlockOuter">
      <tr>
        <div
          valign="top"
          style="padding: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
          class="mcnImageBlockInner"
        >
          <table
            align="left"
            width="100%"
            border="0"
            cellpadding="0"
            cellspacing="0"
            class="mcnImageContentContainer"
            style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
          >
            <tbody>
              <tr>
                <div
                  class="mcnImageContent"
                  valign="top"
                  style="padding-right: 9px;padding-left: 9px;padding-top: 0;padding-bottom: 0;text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
                >
                  <img
                    align="center"
                    alt=""
                    src="https://mcusercontent.com/9bf69911ae198f52f3648150a/images/3c1517cf-3710-4238-99a9-2d105195542e.png"
                    width="564"
                    style="max-width: 3196px;padding-bottom: 0;display: inline !important;vertical-align: bottom;border: 0;height: auto;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;"
                    class="mcnImage"
                  />
                </div>
              </tr>
            </tbody>
          </table>
        </div>
      </tr>
    </tbody>
  </table>
</div>
<div
  valign="top"
  class="mcnTextContent"
  style="padding-top: 0;padding-right: 18px;padding-bottom: 9px;padding-left: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;color: #202020;font-family: Helvetica;font-size: 16px;line-height: 150%;text-align: left;"
>
  <h1
    style="text-align: center;display: block;margin: 0;padding: 0;color: #202020;font-family: Helvetica;font-size: 26px;font-style: normal;font-weight: bold;line-height: 125%;letter-spacing: normal;"
  >
    The 🌎's 1st Music Betting Platform&nbsp;
  </h1>

  <h1
    style="text-align: center;display: block;margin: 0;padding: 0;color: #202020;font-family: Helvetica;font-size: 26px;font-style: normal;font-weight: bold;line-height: 125%;letter-spacing: normal;"
  >
    <br />
    <span style="color:#660099"
      ><span style="font-size:25px">Whats Next?&nbsp;</span></span
    >
  </h1>
</div>
<div
  valign="top"
  class="columnContainer"
  style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
>
  <table
    border="0"
    cellpadding="0"
    cellspacing="0"
    width="100%"
    class="mcnTextBlock"
    style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
  >
    <tbody class="mcnTextBlockOuter">
      <tr>
        <div
          valign="top"
          class="mcnTextBlockInner"
          style="padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
        >
          <!--[if mso]>
				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
				<tr>
				<![endif]-->

          <!--[if mso]>
				<div valign="top" width="300" style="width:300px;">
				<![endif]-->
          <table
            align="left"
            border="0"
            cellpadding="0"
            cellspacing="0"
            style="max-width: 100%;min-width: 100%;/* border-collapse: collapse; */mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
            width="100%"
            class="mcnTextContentContainer"
          >
            <tbody>
              <tr>
                <div
                  valign="top"
                  class="mcnTextContent"
                  style="padding-top: 0;padding-right: 18px;padding-bottom: 9px;padding-left: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;color: #202020;font-family: Helvetica;font-size: 16px;line-height: 150%;text-align: left;"
                >
                  <div style="text-align: center;">
                    <strong>Submit Your Own Questions for Betting&nbsp;</strong>
                  </div>
                  &nbsp;

                  <p
                    style="text-align: center;margin: 10px 0;padding: 0;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #202020;font-family: Helvetica;font-size: 16px;line-height: 150%;"
                  >
                    At Clouty we encourage the notion of engagement and
                    creativity&nbsp; which is why we allowed the "create a game"
                    feature. There are a lot of artists in the universe and we
                    want to encourage new music discovery through music bets.
                  </p>

                  <p
                    style="text-align: center;margin: 10px 0;padding: 0;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #202020;font-family: Helvetica;font-size: 16px;line-height: 150%;"
                  >
                    Every question that is approved to be placed on our leader
                    board will kickback a percentage of the contest back to the
                    game creator. As we begin to rollout engagement between user
                    accounts, game players globally will begin to interact with
                    each other.
                  </p>

                  <p
                    style="margin: 10px 0;padding: 0;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #202020;font-family: Helvetica;font-size: 16px;line-height: 150%;text-align: left;"
                  >
                    &nbsp;
                  </p>

                  <p
                    style="text-align: center;margin: 10px 0;padding: 0;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #202020;font-family: Helvetica;font-size: 16px;line-height: 150%;"
                  >
                    <strong>For all questions email help@clouty.io</strong>
                  </p>

                  <p
                    style="margin: 10px 0;padding: 0;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #202020;font-family: Helvetica;font-size: 16px;line-height: 150%;text-align: left;"
                  >
                    &nbsp;
                  </p>
                </div>
              </tr>
            </tbody>
          </table>
          <!--[if mso]>
				</div>
				<![endif]-->

          <!--[if mso]>
				</tr>
				</table>
				<![endif]-->
        </div>
      </tr>
    </tbody>
  </table>
</div>
<div
  class="mcnTextContent"
  valign="top"
  style="padding: 18px 18px 0px;color: #F2F2F2;font-family: Helvetica;font-size: 14px;font-weight: normal;text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;line-height: 150%;"
  width="246"
>
  <h1
    class="null"
    style="text-align: center;display: block;margin: 0;padding: 0;color: #202020;font-family: Helvetica;font-size: 26px;font-style: normal;font-weight: bold;line-height: 125%;letter-spacing: normal;"
  >
    <strong>Step 1: Collect your free $5 for signing up&nbsp;</strong>
  </h1>
  &nbsp;

  <hr />
  <div style="text-align: center;">
    &nbsp;
  </div>

  <div style="text-align: center;">
    &nbsp;
  </div>

  <h1
    class="null"
    style="text-align: center;display: block;margin: 0;padding: 0;color: #202020;font-family: Helvetica;font-size: 26px;font-style: normal;font-weight: bold;line-height: 125%;letter-spacing: normal;"
  >
    <strong
      >Step 2: Check the Site for New Bets and Place your Wager&nbsp;</strong
    >
  </h1>
  &nbsp;

  <hr />
  <div style="text-align: center;">
    <br />
    &nbsp;
  </div>

  <h1
    class="null"
    style="text-align: center;display: block;margin: 0;padding: 0;color: #202020;font-family: Helvetica;font-size: 26px;font-style: normal;font-weight: bold;line-height: 125%;letter-spacing: normal;"
  >
    <strong>Step 3: Win, Get Paid, Repeat!&nbsp;</strong>
  </h1>

  <div style="text-align: center;">
    &nbsp;
  </div>

  <div style="text-align: center;">
    &nbsp;
  </div>
</div>

<div
  valign="top"
  class="headerContainer"
  style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
>
  <table
    border="0"
    cellpadding="0"
    cellspacing="0"
    width="100%"
    class="mcnImageBlock"
    style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
  >
    <tbody class="mcnImageBlockOuter">
      <tr>
        <div
          valign="top"
          style="padding: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
          class="mcnImageBlockInner"
        >
          <table
            align="left"
            width="100%"
            border="0"
            cellpadding="0"
            cellspacing="0"
            class="mcnImageContentContainer"
            style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
          >
            <tbody>
              <tr>
                <div
                  class="mcnImageContent"
                  valign="top"
                  style="padding-right: 9px;padding-left: 9px;padding-top: 0;padding-bottom: 0;text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
                >
                  <img
                    align="center"
                    alt=""
                    src="https://mcusercontent.com/9bf69911ae198f52f3648150a/images/aaa4c726-eb29-4184-af65-4e88dc164a96.png"
                    width="564"
                    style="max-width: 3196px;padding-bottom: 0;display: inline !important;vertical-align: bottom;border: 0;height: auto;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;"
                    class="mcnImage"
                  />
                </div>
              </tr>
            </tbody>
          </table>
        </div>
      </tr>
    </tbody>
  </table>
</div>
<div
  valign="top"
  class="headerContainer"
  style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
>
  <table
    border="0"
    cellpadding="0"
    cellspacing="0"
    width="100%"
    class="mcnImageBlock"
    style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
  >
    <tbody class="mcnImageBlockOuter">
      <tr>
        <div
          valign="top"
          style="padding: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
          class="mcnImageBlockInner"
        >
          <table
            align="left"
            width="100%"
            border="0"
            cellpadding="0"
            cellspacing="0"
            class="mcnImageContentContainer"
            style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
          >
            <tbody>
              <tr>
                <div
                  class="mcnTextContent"
                  valign="top"
                  style="padding: 0 9px 0 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;color: #656565;font-family: Helvetica;font-size: 12px;line-height: 150%;text-align: center;"
                  width="564"
                >
                  Umbrella's are our thing. Send us pictures of people (you
                  included) in pictures of an umbrella to add to our collage!
                </div>
              </tr>
            </tbody>
          </table>
        </div>
      </tr>
    </tbody>
  </table>
</div>
<div
  valign="top"
  class="headerContainer"
  style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
>
  <table
    border="0"
    cellpadding="0"
    cellspacing="0"
    width="100%"
    class="mcnImageBlock"
    style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
  >
    <tbody class="mcnImageBlockOuter">
      <tr>
        <div
          valign="top"
          style="padding: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
          class="mcnImageBlockInner"
        >
          <table
            align="left"
            width="100%"
            border="0"
            cellpadding="0"
            cellspacing="0"
            class="mcnImageContentContainer"
            style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
          >
            <tbody>
              <tr>
                <div
                  class="mcnImageContent"
                  valign="top"
                  style="padding-right: 9px;padding-left: 9px;padding-top: 0;padding-bottom: 0;text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
                >
                  <img
                    align="center"
                    alt=""
                    src="https://mcusercontent.com/9bf69911ae198f52f3648150a/images/fd608654-fafa-4989-8d7f-49f53da5411d.png"
                    width="564"
                    style="max-width: 3196px;padding-bottom: 0;display: inline !important;vertical-align: bottom;border: 0;height: auto;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;"
                    class="mcnImage"
                  />
                </div>
              </tr>
            </tbody>
          </table>
        </div>
      </tr>
    </tbody>
  </table>
</div>

`,
};
