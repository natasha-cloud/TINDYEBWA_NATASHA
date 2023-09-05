const express = require('express');
const router = express.Router();
const Battery = require('../models/batteryModel'); 
const mongoose = require('mongoose');

// route
router.get("/battery", (req, res) => {
  res.render("/pug/battery.pug");
});

// post data to form
router.post('/battery', async (req,res) => {
  try{
      const batterysignup = new Battery(req.body);
      await batterysignup.save();
      const lastBattery = await Battery.findOne().sort({ _id: -1 }).exec();
      // res.render("/pug/battery.pug");
      const userQueryParam = encodeURIComponent(JSON.stringify(lastBattery));

      // Redirect to another route with the user object as a query parameter
      res.redirect(`/receipt?battery=${userQueryParam}`);

  }
  catch(error){
      res.status(400).render('batterysection.pug');
      console.log(error);
  }
});

// Creating and Save a new Battery Submission
exports.create = (req, res) => {
  // Validate request
  if (!req.body.firstname ||
     !req.body.lastname ||
      !req.body.phone ||
       !req.body.nin ||
      !req.body.time || 
      !req.body.date || 
      !req.body.numberPlate ||
       !req.body.batterySize) {
    return res.status(400).send({ message: "All fields are required!" });
  }

  // Creating a Battery Submission
  const battery = new Battery({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phone: req.body.phone,
    nin: req.body.nin,
    time: req.body.time,
    date: req.body.date,
    numberPlate: req.body.numberPlate,
    batterySize: req.body.batterySize
  });

  // Save Battery Submission in the database
  battery.save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Battery Submission."
      });
    });
};

// Retrieve all Battery Submissions from the database.
exports.findAll = (req, res) => {
  Battery.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving battery submissions."
      });
    });
};

// Find a single Battery Submission with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Battery.findById(id)
    .then(data => {
      if (!data) {
        return res.status(404).send({ message: "Battery Submission not found with id " + id });
      }
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Battery Submission with id=" + id
      });
    });
};

// Update a Battery Submission by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Battery.findByIdAndUpdate(id, req.body, { new: true })
    .then(data => {
      if (!data) {
        return res.status(404).send({ message: "Battery Submission not found with id " + id });
      }
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Battery Submission with id=" + id
      });
    });
};

// delete battery
router.post('/battery/delete', async (req, res) => {
  try {
    const batteryId = req.body.id;

    if (!mongoose.Types.ObjectId.isValid(batteryId)) {
      return res.status(400).send({ message: 'Invalid battery ID' });
    }

    const deletedBattery = await Battery.findOneAndDelete({ _id: batteryId });

    if (!deletedBattery) {
      return res.status(404).send({ message: 'Battery not found' });
    }

    res.redirect('back');
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Internal server error' });
  }
});
// Find all Battery Submissions by condition
exports.findAllByCondition = (req, res) => {
  const condition = req.query; // Using req.query to get the condition from the query parameters

  Battery.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving battery submissions."
      });
    });
};


module.exports = router