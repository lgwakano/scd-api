import "dotenv/config";
import express from 'express';
import cors from 'cors';
import { eventRoutes } from "./routes/eventRoutes";
import { venueRoutes } from "./routes/venueRoutes";
import { postRoutes } from "./routes/postRoutes";

const app = express();
const corsOptions = require('cors');

// Allow requests from specific origins
app.use(corsOptions({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Define Routes
app.use('/events', eventRoutes);
app.use('/venues', venueRoutes);
app.use('/posts', postRoutes);


app.listen(3001, () => {
    //TODO: port should be a env variable
    console.log("App listening on port 3001");
});