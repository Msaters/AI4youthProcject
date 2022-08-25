const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;
const userSchema = new Schema({
 email : {
    type: String,
    required: true,
    unique: true
 },
 password: {
    type: String,
    required: true
 }
})

userSchema.statics.signup = async function(email, password){
    //check if valid
    if (!email || !password)
    {
        throw Error('Fields must not be blank');
    }

    //is Email
    if (!validator.isEmail(email))
    {
        throw Error('Email not valid');
    }

    //is Strong Password
    if (!validator.isStrongPassword(password))
    {
        throw Error('Password not strong enough');
    }

    //exsists?
    const exsists = await this.findOne({ email });
    if (exsists)
    {
        throw Error('Email is already in use');
    }


    //salt & hash
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password ,salt);

    const user = await this.create({email, password: hash});

    return user;
}

userSchema.statics.login = async function(email, password){
    //check if valid
    if (!email || !password)
    {
        throw Error('Fields must not be blank');
    }

    //exsists?
    const user = await this.findOne({ email });
    if (!user)
    {
        throw Error('Email is not valid, make sure you are registered');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match)
    {
        throw Error('Password is not valid');
    }

    return user;
}

module.exports = mongoose.model('User', userSchema)