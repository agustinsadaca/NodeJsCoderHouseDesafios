import path from "path";
import enviarMail from "../utils/nodemailer.js";
import jwt from 'jsonwebtoken'
import { UserModel } from '../models/user.model.js'



export function getLogin(req, res) {
  if (req.isAuthenticated()) {
    const user = req.user;
    console.log("Usuario logueado!");
    res.send({
      usuario: user.userName,
      nombre: user.firstName,
      apellido: user.lastName,
      email: user.email,
    });
  } else {
    res.send("No esta registrado");
  }
}

export function postLogin(req, res) {
  const user = req.user;
  res.send("/");
  // res.cookie('userid', user.id, { maxAge: 2592000000 });
}

export function getFailLogin(req, res) {
  console.log("Error en el login");
  res.send("login-error");
}

export function getSignup(req, res) {
  res.sendFile(path.resolve() + "/registrarse");
}

export function postSignup(req, res) {
  const user = req.user;
  enviarMail.enviarMail(user);

  res.status(200);
}

export function getFailSignup(req, res) {
  console.log("Error en el registro");
  res.json({ error: "err" });
  // res.render('signup-error', {})
}

export function logout(req, res) {
  console.log("Logout");
  res.sendFile(path.resolve() + "/");
}

/* -------------------------------------------------------------------------- */
/*                                     JWT                                    */
/* -------------------------------------------------------------------------- */
const dev = process.env.NODE_ENV !== "production";
const COOKIE_OPTIONS = {
  httpOnly: true,
  // Since localhost is not having https protocol, secure cookies does not work correctly (in postman)
  signed: !dev,
  maxAge: eval(process.env.REFRESH_TOKEN_EXPIRY) * 1000,
  sameSite: "none",
};

export async function createUser(req, res) {
  const { body } = req
  // const user = await UserModel.findOne({ username:body.username }, (err, user) => {
  //   return user
  // })
  // if (user) {
  //   const mensaje = 'Elija otro nombre de usuario'
  //   console.log(mensaje)
  //   res.status(200).json(mensaje)
  // } 
  const password = jwt.sign({ password: body.password }, process.env.PRIVATE_KEY)
  body.password = password
  try {
    const response = await UserModel.create(body, (err, user) => {
      if (err) return err
      console.log('Usuario creado')
      return user
    })
  
    res.status(200).json(response)
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export async function loginUser(req, res) {
  const { body } = req
  
  try {
    const usuario = await UserModel.findOne({ username:body.username }, (err, user) => {
      
      if (err) return err
      if (!user) {
        console.log('Usuario no encontrado!')
        return 
      }
      return user
    }).clone()
    if (!usuario) {
      res.status(400).send('Usuario no encontrado')
    }
    console.log(usuario);
    const password = jwt.verify(usuario.password, process.env.PRIVATE_KEY).password
    console.log(password);
    if (body.password === password) {
      const token = jwt.sign({ usuario }, process.env.PRIVATE_KEY, { expiresIn: '10m' })
      res.cookie("token", token, COOKIE_OPTIONS);
      res.status(200).json({token})
    }
  } catch (error) {
    res.status(401).send(error.message)
  }
}
export async function loginSuccess(req, res) {
  console.log(req.user);
}