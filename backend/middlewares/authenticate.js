import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const dev = process.env.NODE_ENV !== "production";

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  signed: true,
  maxAge: eval(process.env.REFRESH_TOKEN_EXPIRY) * 1000,
  sameSite: "none",
  secret:true
};

export async function isAuth(req, res,next) {
  try {
    const token = req.get('Authorization')
    const verify = await jwt.verify(token.split(" ")[1], process.env.PRIVATE_KEY)
    req.user = verify.user
    next()
  } catch (error) {
    res.status(401).send("Incorrect Authentication token: " + error.message)
  }
}

export const getToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: eval(process.env.SESSION_EXPIRY),
  });
};

