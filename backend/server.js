require('dotenv').config();

const express = require('express');
const blogRouter = require('./APIrouter/blogRoutes/blogRouter');
const userRouter = require('./APIrouter/userRoutes');
const mongoose = require('mongoose');
const requireAuth = require('./middleware/requireAuth');


// express app
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

//make sure that only authorizatied users get rest of API routes
app.use(requireAuth);

//blog routes
app.use(`/api/${name}/blogs` , blogRouter);
