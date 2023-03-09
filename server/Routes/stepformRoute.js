// register

const express = require('express');
const stepFormController = require('../Controller/stepformcontroller');


const router = express.Router();

router.post('/api', stepFormController.saveData);
router.get('/api', stepFormController.getData);


module.exports = router;
