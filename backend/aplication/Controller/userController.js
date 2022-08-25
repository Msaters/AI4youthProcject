const userModel = require("../Models/userModel");
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    const token = jwt.sign({_id}, process.env.SECRET, {expiresIn: '7d'})
    return token;
}

const Login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await userModel.login(email, password);
        
        if (!user)
        {
            throw Error("something went wrong");
        }   

        //create token
        const token = createToken(user._id);

        res.status(200).json({email, token});
    } catch (error) {
      res.status(400).json({error: error.message});  
    }
}

const Signup = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await userModel.signup(email, password);
        
        if (!user)
        {
            throw Error("something went wrong");
        }   

        //create token
        const token = createToken(user._id);

        res.status(200).json({email, token});
    } catch (error) {
      res.status(400).json({error: error.message});  
    }
}

const Logout = async (req, res) => {
    console.log("ok");
}

module.exports = { 
    Login,
    Signup
}