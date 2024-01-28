import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { authenticate } from "../controllers/userController";

passport.use(new LocalStrategy(authenticate));

export default passport;
