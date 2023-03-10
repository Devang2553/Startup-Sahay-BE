const Stepform1 = require("../Model/stepone");
const express = require("express");
const { json } = require("body-parser");

const app = express();
app.use(express.json());

class StepformController1 {
  static saveData_1 = async (req, res) => {
    try {
        // const {name,title,website,industry,summary,revenue,money,address,country,available,generateRevenue,stage,structure,pitch,pastInvestment,communitySize,raisedMoney,runaway} =req.body


    const form1 = new Stepform1({
      name:req.body.name,
      title:req.body.title,
      website:req.body.website,
      industry:req.body.industry,
      summary:req.body.summary,
      revenue:req.body.revenue,
      money:req.body.money,
      address:req.body.address,
      country:req.body.country,
      available:req.body.available,
      generateRevenue:req.body.generateRevenue,
      stage:req.body.stage,
      structure:req.body.structure,
      pitch:req.body.pitch,      // Assign additional fields here for all 14 steps of the stepper form
    });
    console.log(req.body);

    
     const data= await form1.save();
     console.log(data);
      res.status(201).json({ message: "Form submitted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to submit form" });
    }
  };

  static getData_1= async(req,res)=>{
    try {
      const data = await Stepform1.findById('640a2e4667626f8a8d450fae')
      console.log(data);
      res.send(data)
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = StepformController1;
