import "dotenv/config";
import express from "express";
import cors from "cors";
import { eventRoutes } from "./routes/eventRoutes";
import { venueRoutes } from "./routes/venueRoutes";
import { postRoutes } from "./routes/postRoutes";
import { userRoutes } from "./routes/userRoutes";
import session from "express-session";
import passport from "./config/passport";

const app = express();
const corsOptions = require("cors");

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Allow requests from specific origins
app.use(
  corsOptions({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Define Routes
app.use("/events", eventRoutes);
app.use("/venues", venueRoutes);
app.use("/posts", postRoutes);
app.use("/user", userRoutes);

app.listen(3001, () => {
  //TODO: port should be a env variable
  console.log("App listening on port 3001");
});
