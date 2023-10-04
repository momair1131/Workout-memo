const express = require("express");
const Workout = require("../models/Workout");
const mongoose = require("mongoose");

// Seed function
const seedWorkouts = async (req, res) => {
  try {
    await Workout.create([
      {
        title: "Situps",
        reps: 50,
        load: 0,
      },
      {
        title: "Pushups",
        reps: 10,
        load: 0,
      },
      {
        title: "Chinups",
        reps: 20,
        load: 0,
      },
    ]);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

// Index function
const allWorkouts = async (req, res) => {
  try {
    const workout = await Workout.find().sort({ createdAt: -1 });
    res.status(200).json(workout);
  } catch (error) {
    console.log(error);
  }
};

// New function
const newWorkout = async (req, res) => {
  res.render("Show");
};

// Delete function
const delWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "no such workout" });
  }
  const workout = await Workout.findByIdAndDelete(id);
  if (!workout) {
    res.status(400).json({ error: "no such work" });
  }

  res.status(200).json(workout);
};

// Update function
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "no such workout" });
  }
  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body, // the way we get properties that we send on the body in using req.body- it looks like and obj with sent props
      // above we are spreading the obj and outputting the properties and it will update those based on that particular id
    }
  );
  if (!workout) {
    res.status(400).json({ error: "no such work" });
  }
  res.status(200).json(workout);
};

// Create function
const createWorkout = async (req, res) => {
  const emptyFields = [];
  if (!req.body.title) {
    emptyFields.push(req.body.title);
  }
  if (!req.body.load) {
    emptyFields.push(req.body.load);
  }
  if (!req.body.reps) {
    emptyFields.push(req.body.reps);
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill in all the field", emptyFields });
  }
  try {
    const workout = await Workout.create(req.body);
    console.log(req.body);
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Edit function

// Show function
const showWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "no such workout" });
  }
  const workout = await Workout.findById(id);

  if (!workout) {
    res.status(404).json({ error: "no such workout found" });
  }

  res.status(200).json(workout);
};

module.exports = {
  seedWorkouts,
  allWorkouts,
  newWorkout,
  delWorkout,
  updateWorkout,
  createWorkout,
  showWorkout,
};
