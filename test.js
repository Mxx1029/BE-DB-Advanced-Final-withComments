import express, { query } from 'express';
import config from './config.js';
import connect from './database.js';
import seed from './seeders/seed.js';
import { Person, personSchema } from './models/person.js';
import { Score, scoresSchema } from './models/score.js';

const app = express();
config(app);
await connect();
// await seed();

const person = new Person({ name: "Marjo" });
await person.save();

const score = new Score({ 
    total: 98,
    date: new Date(),
    person
 });
await score.save();

person.scores.push(score);
await person.save();


// console.log(score._id);

// delete the specific person from the database
// await person.remove();

// Example of a query
// const query = Person.findById(person._id);
// for populate.(<what field will be populated>, [<but give out>,<only these two subfields>])
// query.populate('scores', ['total', 'date']);
// query.select(['-__v']);
// const checkPerson = await query.exec();
// console.log("Person ", checkPerson);

// const checkScore = await Score.findById(score._id);
// console.log("Score ", checkScore);

// Find some scores
// console.log(await Score.count());
const queryScore = Score.find(); 
// queryScore.gt('total', 90); // gt() means greater than, 1st argument is the field, 2nd the condition
queryScore.gte('total', 20) // greater than or equal
queryScore.lt('total', 90);
// queryScore.where('_id').in(['6163efb3698597536433cb61', '6163efb3698597536433caad']);
// OR: 
queryScore.in('_id', ['6163efb3698597536433cb61', '6163efb3698597536433caad']); // more logical to me, gets query "in" by '_id'; many conditions go into an array in 2nd argument

queryScore.sort({ total: 'desc' }) // sorts total in descending order, OFTEN COMES FROM FRONTEND
// queryScore.limit(10); // only show the first 10 // OFTEN COMES FROM FRONTEND
queryScore.limit(10).skip(10); // show 10 per page, page 2 // OFTEN COMES FROM FRONTEND
// queryScore.skip(10); // show all but skip 1st 10 // OFTEN COMES FROM FRONTEND
// queryScore.limit(10).skip(20); // show 10 per page, page 3
queryScore.select('total');

console.log(await queryScore.exec()); // returns an array