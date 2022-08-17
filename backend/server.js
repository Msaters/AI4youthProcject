require('dotenv').config();

const express = require('express');
const blogRouter = require('./APIrouter/blogRoutes/blogRouter');
const mongoose = require('mongoose');


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

app.use(`/api/${name}/blogs` , blogRouter);