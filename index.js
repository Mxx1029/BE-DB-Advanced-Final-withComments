import express from 'express';
import config from './config.js';
import connect from './database.js';
import seed from './seeders/seed.js';

const app = express();
config(app);
await seed();
await connect();

app.use('/persons', personController);
app.use('/scores', scoreController);
app.use(errorController);

app.listen(process.env.PORT, () => {
    console.log(`App listening on http://localhost:${process.env.PORT}`);
});