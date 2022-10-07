import jwt from 'jsonwebtoken'
import User from '../services/user.js'
import dotenv from 'dotenv';
dotenv.config();

export async function login(req, res) {
  const { body } = req
  try {
    const newUserService = new User
    const user = await newUserService.readOneByEmail(body.email)
    if (!user) {
      return res.status(400).send('Usuario no encontrado')
    }
    const password = jwt.verify(user.password, process.env.PRIVATE_KEY).password
    console.log(password);
    if (body.password === password) {
      const token = jwt.sign({ user }, process.env.PRIVATE_KEY, { expiresIn: '24h' })
      return res.status(200).json({token})
    }else{
      return res.status(401).send('User or password incorrect')
    }
  } catch (error) {
    return res.status(401).send(error.message)
  }
}