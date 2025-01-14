const express = require("express");
const router = express.Router();

const Drones = require("../models/Drone.model");

// require the Drone model here

router.get("/drones", (req, res, next) => {
  // Iteration #2: List the drones
  Drones.find()
    .then((dronesArray) => {
      const data = {
        drones: dronesArray,
      };
      res.render("drones/list", data);
    })
    .catch((e) => {
      console.log("Theres an error", e);
    });
});

router.get("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render("/drones/create");
});

router.post("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  const newDrone = {
    name: req.body.name,
    propellers: req.body.propellers,
    maxSpeed: req.body.maxSpeed,
  };
  Drones.create(newDrone)
    .then((newDrone) => {
      res.redirect("/drones");
    })
    .catch((e) => {
      console.log("Theres an error while creating new drone", e);
      next(e);
    });
});

router.get("/drones/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  const droneId = req.params.id;
  Drones.findById(droneId)

    .then((droneEdit) => {
      res.render("drones/update-form", droneEdit);
    })
    .catch((e) => {
      console.log("Theres an error while editing drone", e);
    });
});

router.post("/drones/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  const droneId = req.params.id;
  const { name, propellers, maxSpeed } = req.body;

  Drones.findByIdAndUpdate(
    droneId,
    { name, propellers, maxSpeed },
    { new: true }
  )
    .then((updatedDrone) => res.redirect("/drones"))
    .catch((e) => {
      console.log("Theres an error while updating drone to the db", e);
    });
  // ... your code here
});

router.post("/drones/:id/delete", (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
});

module.exports = router;
