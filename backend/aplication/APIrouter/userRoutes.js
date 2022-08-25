const express = require('express');
const {
    Login,
    Signup
} = require('../Controller/userController');
const userRouter = express.Router();

//log in 
userRouter.post("/login", Login);

//sign up
userRouter.post("/signup", Signup);

module.exports = userRouter;