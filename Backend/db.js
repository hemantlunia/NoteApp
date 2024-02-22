const mongoose = require('mongoose');
const mongoURI = 'mongodb://127.0.0.1:27017/01notebook?tls=false&readPreference=primary'

const connectToMongo= async()=>{
    await mongoose.connect(mongoURI)
    console.log('connected successfully');
}

module.exports = connectToMongo