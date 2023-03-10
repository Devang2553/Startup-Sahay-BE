const Stepform2 = require("../Model/steptwo");
const express = require("express");
const { json } = require("body-parser");

const app = express();
app.use(express.json());

class StepformController2 {
  static saveData_2 = async (req, res) => {
    try {
        // const {name,title,website,industry,summary,revenue,money,address,country,available,generateRevenue,stage,structure,pitch,pastInvestment,communitySize,raisedMoney,runaway} =req.body


    const form2 = new Stepform2({

      pastInvestment:req.body.pastInvestment,
      communitySize:req.body.communitySize,
      raisedMoney:req.body.raisedMoney,
      runaway:req.body.runaway      // Assign additional fields here for all 14 steps of the stepper form
    });
    console.log(req.body);

    
     const data= await form2.save();
     console.log(data);
      res.status(201).json({ message: "Form submitted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to submit form" });
    }
  };

  static getData_2= async(req,res)=>{
    try {
      const data = await Stepform2.findById('640a2e4667626f8a8d450fae')
      console.log(data);
      res.send(data)
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = StepformController2;
