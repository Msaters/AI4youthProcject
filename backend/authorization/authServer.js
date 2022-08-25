require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');

//express application
const app = express();

// middleware
app.use(express.json());


const name = "name";

mongoose.connect(process.env.MONGO_URI, () => {
  console.log("connected to database");
  app.listen(process.env.PORT, () =>
  {console.log(`listening to port ${process.env.PORT}`)})
})

//user routes (log in, sign up)
app.use(`/api/${name}/user` , userRouter);