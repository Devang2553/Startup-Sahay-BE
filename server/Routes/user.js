// register

const express = require('express');
const usersController = require('../Controller/usersController');
const validateToken = require('../Middleware/validationToken');


const router = express.Router();

router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.get('/getData/:id',usersController.getData)

module.exports = router;
