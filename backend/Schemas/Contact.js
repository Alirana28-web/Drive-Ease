const mongoose = require('mongoose');

const Contact = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [3, 'Name must be at least 3 characters long']
    },
    email: {
        type: String,
        required: true,
    },
    phone :{
        type: Number,
    },
    message: {
    type: String,
        required: [true, 'Message is required'],
        minlength: [10, 'Message must be at least 10 characters long']
    }
})

const Contacts = mongoose.model('Contact', Contact);
module.exports =  Contacts;