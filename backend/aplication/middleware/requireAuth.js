const axios = require('axios');

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({error: 'Authorization token is required'});
    }

    const config = {
        headers: {
          'Authorization':  authorization
        }
      }
    //verify authentication credentials with authServer
    try{
        axios.get('http://localhost:5000/api/name/user/validate', config)
        .then((response) => { 
            req.user = response.data;
            return next();
        })
        .catch((error) => {
            return res.status(401).json(error.response.data);
        })
    } catch (error) {
       return res.status(401).json({error: "Request is not authorized"});
    }
}

module.exports = requireAuth;