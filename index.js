import express from 'express';
import config from './config.js';
import connect from './database.js';
import seed from './seeders/seed.js';
import errorController from './controllers/errorController.js';
import personController from './controllers/personController.js';
import scoreController from './controllers/scoreController.js'; // renamed from router to scoreController

const app = express();
config(app);
await connect();
await seed();

app.use('/persons', personController);
app.use('/scores', scoreController);
app.use(errorController);

app.listen(process.env.PORT, () => {
    console.log(`App listening on http://localhost:${process.env.PORT}`);
});