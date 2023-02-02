const User = require('../../user/entities/User');
const authentication = require('../../../middleware/utils');
const dotenv = require('dotenv');
dotenv.config();

exports.resetPasswordMail = async (data) => {
  let response;
  const { email } = data;
  await User.findOne({ emailAddress: email })
    .then(async (user) => {
      if (!user) {
        throw new Error('User not found');
      } else {
        if (email === user.emailAddress) {
          const payload = {
            user
          };
          const token = authentication.generateToken(payload);
          const mailOptions = {
            to: email,
            from: process.env.email_user,
            subject: 'Reset Password Notification',
            html:
              '<div style="font-size: 16px;">' +
              '<h4 style="color: #3d4852;"><b>Hello</b></h4> <br />' +
              '<p>You are receiving this email because we received a password reset request for your account.</p>' +
              `<a href='${process.env.domain_name}/updatePassword?token=${token}&email=${email}'>Click here</a>` +
              '<p>This password reset link will expire in 60 minutes.</p>' +
              '<p>If you did not request a password reset, no further action is required.</p>' +
              '<p>Regards,<br />Forest Safe</p>' +
              '</div>'
          };
          response = authentication.sendMail(mailOptions);
        }
      }
    })
    .catch((err) => {
      throw err;
    });
  return response;
};
