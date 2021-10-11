import mongoose from 'mongoose';
import { Score } from './score.js';

const { Schema } = mongoose;
const required = true;
const personSchema = new Schema({
    name: { required, type: String },
    scores: [{ type: Schema.Types.ObjectId, ref: "scores" }]
});

// Pre middleware
// personSchema.pre('save', (next) => {
//     console.log("Before save");
//     next();
// });

personSchema.pre('remove', (next) => {
    console.log("Before remove");
    next();
});

// Post middleware (doc is the document that has been saved)
// personSchema.post('save', (doc, next) => {
//     console.log("After save");
//     next();
// })

personSchema.post('remove', async (doc, next) => {
    console.log("After remove");
    // delete all scores connected to this user
    await Score.deleteMany({ person: doc._id });
    next();
});

const Person = mongoose.model("persons", personSchema);

export { personSchema, Person };