const jwt = require('jsonwebtoken');
const userModel = require('../Models/userModel');

const requireAuth = async (req, res, next) => {

    //verify authentication credentials
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({error: 'Authorization token is required'});
    }

    const token = authorization.split(" ")[1];

    try {
        const {_id} = jwt.verify(token, process.env.SECRET);
        
        req.user = await userModel.findById(_id).select("_id");
        //console.log(_id, req.user);

        if (!req.user) {
            throw Error('There is no such a user');
        }

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({error: "Request is not authorized"});
    }
}

module.exports = requireAuth;