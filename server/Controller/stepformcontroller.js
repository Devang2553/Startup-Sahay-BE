const Stepform = require("../Model/stepform");
const express = require("express");
const { json } = require("body-parser");

const app = express();
app.use(express.json());

class StepformController {
  static saveData = async (req, res) => {
    try {
        const {name,title,website,industry,summary,revenue,money,address,country,available,generateRevenue,stage,structure,pitch,pastInvestment,communitySize,raisedMoney,runaway} =req.body


    const form = new Stepform({
      name,
      title,
      website,
      industry,
      summary,
      revenue,
      money,
      address,
      country,
      available,
      generateRevenue,
      stage,
      structure,
      pitch,
      pastInvestment,
      communitySize,
      raisedMoney,
      runaway      // Assign additional fields here for all 14 steps of the stepper form
    });
    console.log(form);
      await form.save();
      res.status(201).json({ message: "Form submitted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to submit form" });
    }
  };
}

module.exports = StepformController;
