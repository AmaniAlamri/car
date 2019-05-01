const mongoose = require('mongoose')
const Schema = mongoose.Schema({
    name:{ type: String, required : true},
    age:{ type: String, required : true},
    image:{ type: String, required : true}

})


const Driver = mongoose.model('Driver',driverSchema)
module.exports = Driver;