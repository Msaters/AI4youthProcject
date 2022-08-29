const express = require('express');
const {
    Login,
    Signup,
    TokenHandler,
    Logout,
    ValidationHandler
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

//validate
userRouter.get('/validate', ValidationHandler);

module.exports = userRouter;