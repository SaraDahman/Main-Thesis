const nodemailer = require('nodemailer');

function sendAuthEmail(receiverEmail, userId) {
  const account = {
    user: 'bankexchange4@gmail.com',
    pass: 'exchange1234',
  };
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: account.user, // generated ethereal user
      pass: account.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let mailInfo = transporter.sendMail({
    from: account.user, // sender address
    to: receiverEmail, // list of receivers
    subject: 'Email confirmation !', // Subject line
    html: `Please press on <a href="http://localhost:3000/emailconfirmation/${userId}">this</a> link to confirm your Email`, // plain text body
  });
  transporter.sendMail(mailInfo, (err, data) => {
    if (err) {
      console.log('Error in sending Email ', err);
    } else {
      console.log('Email sent successfuly !!');
    }
  });
}

module.exports = sendAuthEmail;
