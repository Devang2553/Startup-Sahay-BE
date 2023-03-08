// register

const express = require('express');
const usersController = require('../Controller/usersController');
// const validateToken = require('../Middleware/validationToken');


const router = express.Router();

router.post('/register', usersController.register);

module.exports = router;
