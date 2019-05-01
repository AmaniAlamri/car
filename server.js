const express=require('express')
const app= express()
const company=require('./models/company')



const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/company', {useNewUrlParser: true})
.then(()=>{
console.log("mongodb is running")
}
)
app.set('view engine', 'ejs');

app.get('/companies/new',(req,res)=>{
    res.render('new')
})

app.get('/companies',(req,res)=>{
    res.send("Run at Port 5003")
})


//Driver Index // get all drivers
app.get('/drivers',(req,res)=>{
    Driver.find()
    .then(drivers => {
        res.send(drivers);
    });
})

app.get('/drivers/:id',driver.findById)

app.listen(5003,()=>{
    console.log("Run at Port 5003")

})