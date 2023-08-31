const Log = require('../models/logModel.js');

const controller = {};

controller.saveLog = (req, res, next) => {
        console.log('req.body', req.body);
        console.log(input.exercise.value)
        const { exercise, weight, repetitions, sets, date } = req.body;
        res.locals.newLog = {
            exercise: exercise,
            weight: weight,
            repetitions: repetitions,
            sets: sets,
            date: Date.toString()
        }
        return next();
   
}



module.exports = controller;