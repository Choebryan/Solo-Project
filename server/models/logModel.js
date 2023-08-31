const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();
const MONGO_URI = process.env.DATABASE_URL;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'Solo_Project'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const logSchema = new Schema({
  exercise: String,
  weight: Number,
  repetitions: Number,
  sets: Number,
  date: String
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;
