import mongoose from 'mongoose';
import { Score } from './score.js';

const { Schema } = mongoose;
const required = true;
const personSchema = new Schema({
    name: { required, type: String },
    scores: [Score]
});
const Person = mongoose.model("persons", personSchema);

export { personSchema, Person };