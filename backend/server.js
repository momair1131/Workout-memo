require("dotenv").config();
const express = require("express");
const app = express();
const workoutRoutes = require("./routes/workouts");
const mongoose = require("mongoose");

// middleware
//we will use Express' built-in middleware express.json for parsing the incoming JSON payload and attach it to our router
// then we can use req.body.somename
app.use(express.json()); // We use the express.json built-in middleware function to JSON content received from the incoming requests.

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then((result) =>
    app.listen(process.env.PORT, () => {
      console.log("connected to DB & listening on port " + process.env.PORT);
    })
  )
  .catch((err) => console.log(err));
//routes
// grab all the routes from workout routes file
app.use("/api/workouts", workoutRoutes);
