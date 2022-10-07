import jwt from 'jsonwebtoken'
import User from '../services/user.js'
import dotenv from 'dotenv';
import enviarMail from "../utils/nodemailer.js";


dotenv.config();

export async function createUser(req, res) {
  const { body } = req
  const newUserService = new User()
  const checkMail = await newUserService.readOneByEmail(body.email)
  if (checkMail) {
    return res.status(400).json({message:'Email already exists'})
  }
  const password = jwt.sign({ password: body.password }, process.env.PRIVATE_KEY)
  console.log(password);
  body.password = password
  try {
    const response = await newUserService.createUser(body)
    const html = `<h1> Usuario creado, email ${body.email} <h1/>`
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: [process.env.GMAIL_USER,body.email],
      subject: "Usuario creado",
      html: html,
      
    };
    
    enviarMail(mailOptions)
    console.log(typeof(response));
    return res.status(200).json(JSON.stringify(response));
  } catch (error) {
    return res.status(400).send(error.message)
  }
}