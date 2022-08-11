import { createTransport } from "nodemailer";
import dotenv from "dotenv";

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
  from: "no-reply@c2140416.ferozo.com",
  to: ["no-reply@c2140416.ferozo.com",user.email],
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

sendMailEthereal();

/* ---------------------------------- GMAIL --------------------------------- */

// const transporterGmail = createTransport({
//   service: "gmail",
//   port: 587,
//   auth: {
//     user: "diegoff@gmail.com",
//     pass: "oukzwglwrkovrnki",
//   },
// });

// async function sendMailGmail() {
//   try {
//     const response = await transporterGmail.sendMail(mailOptions);
//     console.log(response);
//   } catch (error) {
//     console.log(error);
//   }
// }

// sendMailGmail();

 }

export default {enviarMail};