require('dotenv').config();

const express = require('express');
const blogRouter = require('./APIrouter/blogRoutes/blogRouter');
const mongoose = require('mongoose');
const requireAuth = require('./middleware/requireAuth');
const cors = require('cors');


// express app
const app = express();

// middleware
app.use(express.json());

//CORS middleware
app.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "DELETE", "PATCH"]
    })
  );

const name = "name";

mongoose.connect(process.env.MONGO_URI, () => {
    console.log("connected to database");
    app.listen(process.env.PORT, () =>
    {console.log(`listening to port ${process.env.PORT}`)})
})

//user routes are handled by authServer

//make sure that only authorizatied users get rest of API routes
app.use(requireAuth);

//blog routes
app.use(`/api/${name}/blogs` , blogRouter);

//change requireAuth
app.use((req, res) => { return res.status(404).json({ error: "Page not found"})})