import "dotenv/config";
import express from 'express';
import { eventRoutes } from "./routes/eventRoutes";
import { venueRoutes } from "./routes/venueRoutes";
import { postRoutes } from "./routes/postRoutes";

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://melodic-profiterole-63a18b.netlify.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.options('/*', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'https://melodic-profiterole-63a18b.netlify.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.status(200).send();
});

  
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