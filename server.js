const express=require('express')
const app= express()
const company=require('./models/company')



const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/company', {useNewUrlParser: true})
.then(()=>{
console.log("mongodb is runing")
}
)
app.set('view engine', 'ejs');

app.get('/company/new',(req,res)=>{
    res.render('new')
})

app.get('/company',(req,res)=>{
    res.send("Run at Port 5003")
})


app.listen(5003,()=>{
    console.log("Run at Port 5003")

})