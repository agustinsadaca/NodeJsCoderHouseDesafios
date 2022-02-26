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
    res.sendFile(path.resolve()+'/')
  }
}

export function postLogin(req, res) {
  const user = req.user
  res.status(200)
}

export function getFailLogin(req, res){
  console.log('Error en el login')
  res.render('login-error', {})
}

export function getSignup(req, res){
  res.sendFile(path.resolve()+'/registrarse')
}

export function postSignup(req, res) {

  const user = req.user
  enviarMail.enviarMail(user)

  res.sendFile(path.resolve()+'OK')
}

export function getFailSignup(req, res) {
  console.log('Error en el registro')
  res.json({ error: "err" })
  // res.render('signup-error', {})
}

export function logout(req, res) {
  console.log('Logout')
  res.sendFile(path.resolve()+'/')
}

