const mongoose = require('mongoose')

const uri = process.env.MONGODB_URL
console.log(uri)
mongoose.connect(uri)
