import express from 'express'
import passport from '../utils/passport.util.js'
import * as AuthController from '../controllers/auth.controllerTest.js'
import * as AuthMiddleware from '../middlewares/auth.middleware.js'

const router = express.Router()

// router.get('/login',AuthController.getLogin)
// router.post('/login', passport.authenticate('login',{failureRedirect:'/failLogin'}),AuthController.postLogin)
// JWT:
router.get('/login', AuthMiddleware.isAuth,AuthController.loginSuccess)
router.post('/login', AuthController.loginUser)
router.get('/failLogin', AuthController.getFailLogin)

// router.get('/signup',AuthController.getSignup)
// router.post('/signup',passport.authenticate('signup',{failureRedirect:'/failSignup'}),AuthController.postSignup)
//JWT:
router.post('/signup',AuthController.createUser)
router.get('/failSignup', AuthController.getFailSignup)

router.get('/logout', AuthController.logout)

router.get('/protected', AuthMiddleware.checkAuthentication, (req,res) => {
  if(req.isAuth == true){
    console.log('Esta autenticado!!!!!!!!!!')
  res.send(true)}else{
    console.log('Usuario no autorizado')

    res.send(false)}
})

export default router