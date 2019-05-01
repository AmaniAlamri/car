const express=require('express')
const app= express()
const company=require('./models/company')
const Driver=require('./models/driver')
const Car=require('./models/car')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/company', {useNewUrlParser: true})
.then(()=>{
console.log("mongodb is running")
}
)
app.set('view engine', 'ejs');

//...........................................
//1- Company Routes

//Company index
app.get('/companies',(req,res)=>{
    Company.find()
    .then(companies => {
        res.send(companies);
    });
})

//Company New
app.get('/companies/new',(req,res)=>{
    res.render('new')
})

//...........................................
//2- Driver Routes

//Driver Index // get all drivers
app.get('/drivers',(req,res)=>{
    Driver.find()
    .then(drivers => {
        res.send(drivers);
    });
})

//Driver New
app.get('/drivers/new', (req, res) => {
    Driver.find()
      .then(drivers => {
        res.render('drivers/new', { drivers })
      })
  })

//Driver post
app.get('/drivers',(req,res)=>{
    let data= {
        name: req.body.name,
        age: req.body.age,
        image: req.body.image
    }
    let newDriver=new Driver(data)
    newDriver.save()
    .then(()=>{
        res.redirect('/drivers')
    })
    .catch(err=>console.log(err))
}
)
app.get('/drivers/:id',(req,res))

//Driver show
app.get('/drivers/:id',(req,res)=>{
   Driver.findById(req.params.id)
   .then((driver)=>{
res.render('show',{driver:driver})
   }) 
})


//...........................................
//3- Car Routes



app.listen(5003,()=>{
    console.log("Run at Port 5003")

})