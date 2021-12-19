import path from 'path'
import enviarMail from '../utils/nodemailer.js'


export function getLogin(req, res) {
  if (req.isAuthenticated()) {
    const user = req.user
    console.log('Usuario logueado!')
    res.render('login-ok', {
      usuario: user.userName,
      nombre: user.firstName,
      apellido: user.lastName,
      email:user.email
    })
  } else {
    console.log('No esta registrado')
    res.sendFile(path.resolve()+'/views/login.html')
  }
}

export function postLogin(req, res) {
  const user = req.user
  console.log(user)
  res.sendFile(path.resolve()+'/views/index.html')
}

export function getFailLogin(req, res){
  console.log('Error en el login')
  res.render('login-error', {})
}

export function getSignup(req, res){
  res.sendFile(path.resolve()+'/views/signup.html')
}

export function postSignup(req, res) {

  const user = req.user
  enviarMail.enviarMail(user)
  // console.log(user)
  // res.json({Creaddoooooo:1331})
  res.sendFile(path.resolve()+'/')
}

export function getFailSignup(req, res) {
  console.log('Error en el registro')
  res.json({ error: "as" })
  // res.render('signup-error', {})
}

export function logout(req, res) {
  console.log('Logout')
  res.sendFile(path.resolve()+'/views/index.html')
}

