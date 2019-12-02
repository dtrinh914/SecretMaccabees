// import nodemailer (after npm install nodemailer)
const nodemailer = require('nodemailer');

// config for mailserver and mail, input your data
const config = {
  mailserver: {
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: 'yutfggtgifd7ixet@ethereal.email',
      pass: 'tX29P4QNadD7kAG7x5'
    }
  },
  mail: {
    from: 'foo@example.com',
    to: 'bar@example.com',
    subject: 'Hey',
    text: 'Testing Nodemailer'
  }
};

const sendMail = async ({ mailserver, mail }) => {
  // create a nodemailer transporter using smtp
  let transporter = nodemailer.createTransport(mailserver);

  // send mail using transporter
  let info = await transporter.sendMail(mail);

  console.log(`Preview: ${nodemailer.getTestMessageUrl(info)}`);
};

sendMail(config).catch(console.error);