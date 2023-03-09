const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  name: String,
  title: String,
  website: String,
  industry: String,
  summary: String,
  revenue: String,
  money: String,
  address: String,
  country: String,
  available: String,
  generateRevenue: String,
  stage: String,
  structure: String,
  pitch:String,
  pastInvestment:String,
  communitySize:String,
  raisedMoney:String,
  runaway:String,



  // Define additional fields here for all 14 steps of the stepper form
});


module.exports= mongoose.model('Form', formSchema);

