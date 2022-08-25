const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const refreshTokenSchema = new Schema({
 refresh_token : {
  type: String,
  required: true,
 },
 email: {
  type: String,
  required: true,
  unique: true
 },
})

module.exports = mongoose.model('Refresh_Token', refreshTokenSchema)