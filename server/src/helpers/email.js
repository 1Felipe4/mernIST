import nodeMailer from "nodemailer";
import dotenv from 'dotenv';


dotenv.config(); 
exports.sendEmailWithNodemailer = async (req, res, emailData) => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    service: 'gmail',
    requireTLS: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      ciphers: "SSLv3",
    },
  });
 
  
    const info = transporter
        .sendMail(emailData, (err, info) => {
            err ?
                console.log(`Problem sending email: ${err}`)
                :
                console.log(`Message sent: ${info.response}`);
                res.json({
                message: `Email has been sent to your email. Follow the instruction to activate your account`,
            });
        });
};