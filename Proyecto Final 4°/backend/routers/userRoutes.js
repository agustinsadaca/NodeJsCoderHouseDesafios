import express from 'express';
import jwt from 'jsonwebtoken';
import * as UserController from '../controllers/user.controller.js';

const router = express.Router()
/* -------------------------------------------------------------------------- */
/*                                   Signup                                   */
/* -------------------------------------------------------------------------- */
router.post('/',UserController.createUser)


export default router