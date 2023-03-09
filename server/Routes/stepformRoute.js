// register

const express = require('express');
const stepFormController = require('../Controller/stepformcontroller');


const router = express.Router();

router.post('/api', stepFormController.saveData);


module.exports = router;
