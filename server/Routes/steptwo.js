// register

const express = require('express');
const stepFormController2= require('../Controller/steptwo.controller');


const router = express.Router();

router.post('/api', stepFormController2.saveData_2);
router.get('/api', stepFormController2.getData_2);


module.exports = router;
