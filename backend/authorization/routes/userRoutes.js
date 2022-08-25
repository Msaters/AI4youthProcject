const express = require('express');
const {
    Login,
    Signup,
    TokenHandler,
    Logout
} = require('../Controller/userController');
const userRouter = express.Router();

//validate token
userRouter.post('/token', TokenHandler);

//log in 
userRouter.post("/login", Login);

//sign up
userRouter.post("/signup", Signup);

//log out
userRouter.delete("/logout", Logout);

module.exports = userRouter;