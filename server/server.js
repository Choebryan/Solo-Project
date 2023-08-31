const path = require('path');
const express = require('express');
require('dotenv').config();
const controller = require('./controllers/controller')
const app = express();
const PORT = 3000;

const logRouter = require('./routes/logWorkout.js');
const Log = require('./models/logModel.js');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/dist', express.static(path.join(__dirname, '../client')));

// app.use('/logworkout', logRouter);

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/index.html'));
});


app.get('/library', (req, res, next) => {
  console.log('about to fetch library')
  fetch('https://api.api-ninjas.com/v1/exercises?offset=' + Math.floor(Math.random() * 1001), {
    method: 'GET',
    headers: {
      'X-Api-Key': process.env.API,
    }
  })
    .then(response => response.json())
    .then(data => {
      // res.json(data);
      res.locals.library = data;
      console.log('middleware for library data', data);
      return next();
    })
}, (req, res) => {
  return res.status(200).send(res.locals.library);
})


app.get('/api', async (req, res) => {
  try {
    const workouts = await Log.find({});
    res.json(workouts);
  } catch (error) {
    console.error('Error fetching workouts:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api', async (req, res) => {
  const date = new Date();
  const newWorkout = {
    exercise: req.body.exercise,
    weight: req.body.weight,
    repetitions: req.body.repetitions,
    sets: req.body.sets,
    date: date.toUTCString()
  };
  try {
    const savedWorkout = await Log.create(newWorkout);
    res.json(savedWorkout);
  } catch (error) {
    console.error('Error adding workout:', error);
    res.status(500).json({ error: 'Server error' });
  }
});









// app.use((req, res) => res.status(404).send('Sorry, page not found.'));

app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });


app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;