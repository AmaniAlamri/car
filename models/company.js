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
    drivers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Driver' }],
    cars:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }]
}, {timestamps: true}
);



const Company = mongoose.model('Company', companySchema)
module.exports = Company;