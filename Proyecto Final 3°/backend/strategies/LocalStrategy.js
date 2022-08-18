import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import {UserModel as User}  from "../models/user.model.js";

//Called during login/sign up.
passport.use(new LocalStrategy(User.authenticate()));

//called while after logging in / signing up to set user details in req.user
passport.serializeUser(User.serializeUser());
