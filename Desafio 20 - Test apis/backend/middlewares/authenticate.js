import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import passport from 'passport';

dotenv.config();
const dev = process.env.NODE_ENV !== "production";

export const COOKIE_OPTIONS = {
  httpOnly: true,
  // Since localhost is not having https protocol, secure cookies does not work correctly (in postman)
  secure: true,
  signed: true,
  maxAge: eval(process.env.REFRESH_TOKEN_EXPIRY) * 1000,
  sameSite: "none",
  secret:true
};

export const getToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: eval(process.env.SESSION_EXPIRY),
  });
};

export const getRefreshToken = (user) => {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: eval(process.env.REFRESH_TOKEN_EXPIRY),
  });
  return refreshToken;
};

export const verifyUser = passport.authenticate("jwt", { session: false });

// export function verifyUser(req, res, next) {
//   console.log(req.isAuthenticated());
//   // if (req.isAuthenticated()) {
//   //   next()
//   // }
  
// }