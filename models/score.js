import mongoose from 'mongoose';
import { Person } from './person.js';

const { Schema } = mongoose;
const required = true;
const scoreSchema = new Schema({
    person: { required, type: Schema.Types.ObjectId, ref: "persons"  },
    total: { required, type: Number },
    date: { required, type: Date },
});
const Score = mongoose.model("scores", scoreSchema);

export { scoreSchema as scoresSchema, Score };