import dotenv from 'dotenv';
import { createTransport } from 'nodemailer';

function enviarMail(user) {
  
dotenv.config();
const transporter = createTransport({
  host: process.env.HOST,
  port: process.env.PORT,
  auth: {
    user: process.env.AUTH_USER,
    pass: process.env.AUTH_PASS,
  },
});

const mailOptions = {
  from: process.env.GMAIL_USER,
  to: [process.env.GMAIL_USER,user.email],
  subject: "Nueva subscripcion",
  html: `<h1>Nueva subscripcion ecommerce CoderHouse, usuario ${user.username}, ${user.firstName}, ${user.lastName}</h1>`,
  
};

async function sendMailEthereal() {
  try {
    const response = await transporter.sendMail(mailOptions);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

// sendMailEthereal();

/* ---------------------------------- GMAIL --------------------------------- */

const transporterGmail = createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

async function sendMailGmail() {
  try {
    const response = await transporterGmail.sendMail(mailOptions);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

sendMailGmail();

 }

export default enviarMail;