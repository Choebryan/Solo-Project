const express = require('express');

const controller = require('../controllers/controller.js');

const router = express.Router();

router.post('/', controller.saveLog, (req, res) => {
    console.log('hiiii');
    return res.status(200).send('hi');
})



module.exports = router;