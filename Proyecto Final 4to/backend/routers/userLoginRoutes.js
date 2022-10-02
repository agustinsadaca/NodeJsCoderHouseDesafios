import express from 'express';
import jwt from 'jsonwebtoken';
import * as AuthController from '../controllers/auth.controller.js'

import {
  COOKIE_OPTIONS,
  getToken,
} from '../middlewares/authenticate.js';
import { UserModel as User } from '../models/user.model.js';
import enviarMail from '../utils/nodemailer.js';

const router = express.Router()
/* -------------------------------------------------------------------------- */
/*                                    Login                                   */
/* -------------------------------------------------------------------------- */

  router.post('/',AuthController.login)


  export default router