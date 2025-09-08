const nodemailer = require("nodemailer");
require("dotenv").config();
const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      secure: false,
      auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
      },
});
const mailSender = async (email, subject, body) => {
      try {
            const info = await transporter.sendMail({
                  from: `Edu-Tech | ${process.env.MAIL_USER} `,
                  to: email,
                  subject: subject,
                  html: ` <div style="font-family: Arial, sans-serif; padding: 18px;">
                <h2 style="margin:0 0 8px 0;">${body}</h2>
                <p style="font-size: 13px; color: #666;">This code will expires in 5 minutes.</p>
              </div>`,
            });
            return info;
      } catch (error) {
            console.log("Error while sending the email", error.message);
      }
};

module.exports = mailSender;
