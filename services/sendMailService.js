const nodemailer = require('nodemailer');

const {
  MAILTRAP_USER,
  MAILTRAP_PASSWORD,
  MAILTRAP_HOST,
} = process.env;

const sendForgotPasswordEmail = async ({ resetPasswordToken, email }) => {
  const transporter = nodemailer.createTransport({
    host: MAILTRAP_HOST,
    port: 2525,
    auth: {
      user: MAILTRAP_USER,
      pass: MAILTRAP_PASSWORD
    }
  });

  const info = await transporter.sendMail({
    from: '"Bruno Hirata" <bruno.hirata@domain.com>', // sender address
    to: `${email}, ${email}`, // list of receivers
    subject: "Reset password requested", // Subject line
    text: `Reset password token: ${resetPasswordToken}`, // plain text body
    html: `Reset password token: <b>${resetPasswordToken}</b>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = {
  sendForgotPasswordEmail,
}
