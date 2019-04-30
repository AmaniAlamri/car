const mongoose = require('mongoose')
const Schema = mongoose.Schema

const companySchema = new Schema({
    name : {type: String, required : true},
    logo: { type: String, required : true},
    address: { type: String, required : true},
    city: { type: String, required : true},
    telephone: { type: Number, required : true},
    createdAt: { type: Date, required : true},
    updatedAt: { type: Date, required : true},
    drivers:[{
        name:{ type: String, required : true},
        age:{ type: String, required : true},
        image:{ type: String, required : true},
    }],
    cars:[{
        name: {type: String, required : true},
        model:{type: String, required : true},
        year:{type: Date, required : true},
        image:{type: String, required : true},
    }]

})

const Company = mongoose.model('Company', companySchema)
module.exports = Company;