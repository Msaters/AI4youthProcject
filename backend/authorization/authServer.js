require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');
const cors = require('cors');

//express application
const app = express();

// middleware
app.use(express.json());

//CORS middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE"]
  })
);


const name = "name";

mongoose.connect(process.env.MONGO_URI, () => {
  console.log("connected to database");
  app.listen(process.env.PORT, () =>
  {console.log(`listening to port ${process.env.PORT}`)})
})

//user routes (log in, sign up)
app.use(`/api/${name}/user` , userRouter);