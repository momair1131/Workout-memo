const express = require("express");
const router = express.Router();

const Workout = require("../models/Workout");
const {
  seedWorkouts,
  allWorkouts,
  createWorkout,
  delWorkout,
  updateWorkout,
  showWorkout,
} = require("../controllers/workoutController");

// Routes

router.get("/seed", seedWorkouts);

// Index Route
router.get("/", allWorkouts);

// New Route - post a new workout
router.post("/", createWorkout);

// Delete Route - delete a workout
router.delete("/:id", delWorkout);

// update a route
// PATCH is a method of modifying resources where the client sends partial data that is to be updated without modifying the entire data.
// PUT is a method of modifying resource where the client sends data that updates the entire resource .

router.patch("/:id", updateWorkout);

// Edit Route

// Show Route - Get a single workout
router.get("/:id", showWorkout);

module.exports = router;
