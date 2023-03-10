const mongoose = require('mongoose');

const formSchema2 = new mongoose.Schema({
  pastInvestment:String,
  communitySize:String,
  raisedMoney:String,
  runaway:String,



  // Define additional fields here for all 14 steps of the stepper form
});


module.exports= mongoose.model('stepTwo', formSchema2);

