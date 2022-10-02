import jwt from 'jsonwebtoken'
import User from '../services/user.js'
import dotenv from 'dotenv';

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
    res.status(200).json(response)
  } catch (error) {
    res.status(400).send(error.message)
  }
}