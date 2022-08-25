const userModel = require("../Models/userModel");
const refreshTokenModel = require("../Models/refreshTokenModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createAccessToken = (_id) => {
    const token = jwt.sign({_id}, process.env.SECRET, {expiresIn: '15s'})
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
        const accesToken = createAccessToken(user._id);
        const refreshToken = jwt.sign({_id: user._id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1y'})

        //hash refresh_token
        const hash = await bcrypt.hash(refreshToken, 10);

        //refresh refresh_token in db (delete past and add new)
        await refreshTokenModel.findOneAndDelete({email: email});
        await refreshTokenModel.create({refresh_token: hash, email: email});

        res.status(200).json({email: email, accesToken, refreshToken});
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
        const accesToken = createAccessToken(user._id);
        const refreshToken = jwt.sign({_id: user._id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1y'})

		//hash refresh_token
		const hash = await bcrypt.hash(refreshToken, 10);

		//commect refresh token to database
        await refreshTokenModel.create({refresh_token: hash, email: email});

        res.status(200).json({email, accesToken, refreshToken});
    } catch (error) {
      res.status(400).json({error: error.message});  
    }
}

const Logout = async (req, res) => {
  try {
    const refresh_token = req.body.refresh_token;
    const email = req.body.email;

    if (!refresh_token || !email)
    {
      return res.status(401).json({error: "You must provide refresh token and email."});
    }

    const refresh_token_db = await refreshTokenModel.findOne({email});

    if (!refresh_token_db)
    {
      return res.status(404).json({error: "You have already been logout."});
    }

    const match = await bcrypt.compare(refresh_token, refresh_token_db.refresh_token);

    if (!match)
    {
      return res.status(403).json({error: "Invalid refresh token."});
    }

    jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, async (err) => {
      if (err) return res.status(403).json({error: "Your refresh token must get veryfied correctly"});
      await refresh_token_db.delete();
      return res.status(200).json({message: "Your refresh token has been removed from data base."});
    })
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
}

const TokenHandler = async (req, res) => {
  try {
    const refresh_token = req.body.refresh_token;
    const email = req.body.email;

    if (!refresh_token || !email)
    {
      return res.status(401).json({error: "You must provide refresh token and email."});
    }

    const {refresh_token: refresh_token_db} = await refreshTokenModel.findOne({email});
    const match = await bcrypt.compare(refresh_token, refresh_token_db);
    
    if (!match)
    {
      return res.status(403).json({error: "Invalid refresh token."});
    }

    jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, (err, user_id) => {
      if (err) return res.status(403).json({error: "Your refresh token must get veryfied correctly"});
      const accesToken = createAccessToken({ _id: user_id });
      return res.status(200).json({accesToken: accesToken});
    })
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
}


module.exports = { 
    Login,
    Signup,
    TokenHandler,
    Logout
}