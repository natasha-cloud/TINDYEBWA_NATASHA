const express = require('express');
const router = express.Router();
const cartyreclinic = require('../models/tyreModel'); 
const mongoose = require('mongoose');

// route
router.get("/tyre", (req, res) => {
  res.render("/pug/cartyreclinic.pug");
});

// post data to form
// router.post('/cartyreclinic', async (req,res) => {
//   try{
//       const cartyreclinicsignup = new cartyreclinic(req.body);
//       await cartyreclinicsignup.save();
//       const userQueryParam = encodeURIComponent(JSON.stringify(lasttyre));
//       const lastTyre = await tyre.findOne().sort({ _id: -1 }).exec();

//       res.redirect('/receipt?cartyreclinic=${userQueryParam}');
//   }
//   catch(error){
//       res.status(400).render('cartyreclinic.pug');
//       console.log(error);
//   }
// });

// Creating and Save a new cartyreclinic Submission
exports.create = (req, res) => {
  // Validate request
  if (!req.body.firstname ||
     !req.body.lastname ||
      !req.body.phone ||
       !req.body.nin ||
      !req.body.time || 
      !req.body.date || 
      !req.body.numberPlate ||
       !req.body.cartyreclinicSize) {
    return res.status(400).send({ message: "All fields are required!" });
  }

  // Creating a cartyreclinic Submission
  const Cartyreclinic = new cartyreclinic({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phone: req.body.phone,
    nin: req.body.nin,
    time: req.body.time,
    date: req.body.date,
    numberPlate: req.body.numberPlate,
    cartyreclinicSize: req.body.cartyreclinicSize
  });

  // Save cartyreclinicForm Submission in the database
  Cartyreclinic.save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the cartyreclinic Submission."
      });
    });
};

// Retrieve all cartyreclinicForm Submissions from the database.
exports.findAll = (req, res) => {
  cartyreclinic.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving cartyreclinicForm submissions."
      });
    });
};

// Find a single cartyreclinic Submission with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Cartyreclinic.findById(id)
    .then(data => {
      if (!data) {
        return res.status(404).send({ message: "cartyreclinicForm Submission not found with id " + id });
      }
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving cartyreclinicForm Submission with id=" + id
      });
    });
};

// Update a cartyreclinic Submission by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Cartyreclinic.findByIdAndUpdate(id, req.body, { new: true })
    .then(data => {
      if (!data) {
        return res.status(404).send({ message: "cartyreclinicForm Submission not found with id " + id });
      }
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating cartyreclinicForm Submission with id=" + id
      });
    });
};

// Delete a cartyreclinic Submission with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Cartyreclinic.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        return res.status(404).send({ message: "cartyreclinicForm Submission not found with id " + id });
      }
      res.send({ message: "cartyreclinicForm Submission was deleted successfully!" });
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete cartyreclinicForm Submission with id=" + id
      });
    });
};

// Delete all cartyreclinic Submissions from the database.
exports.deleteAll = (req, res) => {
  cartyreclinic.deleteMany({})
    .then(data => {
      res.send({ message: `${data.deletedCount} cartyreclinicForm Submissions were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all cartyreclinicForm submissions."
      });
    });
};

// Find all cartyreclinicForm Submissions by condition
exports.findAllByCondition = (req, res) => {
  const condition = req.query; // Using req.query to get the condition from the query parameters

  Cartyreclinic.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving cartyreclinicForm submissions."
      });
    });
};


module.exports = router;