// import nodemailer (after npm install nodemailer)
const nodemailer = require('nodemailer');
const MAIL_SERVER = require('../config/MAIL_SERVER');

// config for mailserver. Please fill in your own info. Ex.{host:,port:,secure:,auth:,pass:}
const config = MAIL_SERVER;

function generateMail(emailTo, giftRecipient){
  const message = {
    from: 'foo@example.com',
    to: emailTo,
    subject: 'Hey',
    text: `You need to get a gift for ${giftRecipient} `
  } 

  sendMail(config, message).catch(console.error);
}

const sendMail = async (mailserver, mail) => {
  // create a nodemailer transporter using smtp
  let transporter = nodemailer.createTransport(mailserver);

  // send mail using transporter
  let info = await transporter.sendMail(mail);

  console.log(`Preview: ${nodemailer.getTestMessageUrl(info)}`);
};

module.exports.generateMail = generateMail;