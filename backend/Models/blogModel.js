const mongoose = require('mongoose')

const Schema = mongoose.Schema

const blogSchema = new Schema({
    title: { type: String , required: true},
    author: { type: String , required: true},
    body: { type: String , required: true},
    user_id: { type: String, required: true},
    comments: [{type: String, commentator: String , date: Date, required: true }]
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema)