// register

const express = require('express');
const stepFormController1 = require('../Controller/stepone.controller');


const router = express.Router();

router.post('/api', stepFormController1.saveData_1);
router.get('/api/:id', stepFormController1.getData_1);


module.exports = router;
