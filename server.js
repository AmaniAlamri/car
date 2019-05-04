const express=require('express')
const app= express()
const bodyParser = require('body-parser');
const Company=require('./models/company')
const Driver=require('./models/driver')
const Car=require('./models/car')
const mongoose = require('mongoose');
const cors = require('cors')


app.use(cors())
app.use(express.json()) //recieve json from req.body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


mongoose.connect('mongodb://localhost/driver_management', {useNewUrlParser: true})
.then(()=>{
console.log("mongodb is running")
},err=>{console.log(err)})

//app.set('view engine', 'ejs');

//...........................................
//1- Company Routes

//Company index
app.get('/company',(req,res)=>{
    Company.find({})
    .populate({path: 'cars', model: 'Car'})
    .then(company =>{
      res.status(200).json({ company : company })
      return false
    })
    .catch(err => {
      res.json({ message: err })
      return false
    })
})

//Company New
app.post('/company/new',(req,res)=>{
    res.render('new')
    let inputData = {
        name: req.body.name,
        image: req.body.image
      }
      Company.create(inputData)
      .then(() => {
        res.json({ message: "Company Added!"})
        return false
      })
      .catch(err => res.json({message: err}))
    })


    //Company put after new
    app.put('/company/:id/car/new', (req, res) => {
        let inputData = {
          cars : req.params.cars
        }
        Company.findOneAndUpdate(req.params.id,{ $push :{ cars: req.body.cars }})
        .then(() => {
          res.json({ message: "Company Added!"})
          return false
        })
        .catch(err => res.json({message: err}))
      })


//Company Show 
app.get('/company/:id', (req, res) => {
    //5cc3f985b274e02cb10ea4f4
    Company.findById(req.params.id)
    .populate('cars')
    .exec((err, company) =>{
      if (err){
        res.json({ message: err })
        return false;
      }
      res.status(200).json({company : company })
      return false
    })
  })



//...........................................
//2- Driver Routes
//driver routes
app.get('/', (req, res) => {

    Driver.find({}).then(driver =>{
      res.status(200).json({drivers : driver })
    })
    .catch(err => {
      res.json({ message: err })
    })
    res.json({message: "root page"})
  })
  
  
  //driver routes
  app.get('/drivers', (req, res) => {
    Driver.find({})
    // .populate('cars')
    .then(driver =>{
      res.status(200).json({ count:driver.length, drivers : driver })
      return false
    })
    .catch(err => {
      res.json({ message: err })
      return false
    })
  
  })
  
  app.get('/drivers/:id', (req, res) => {
    //find drivers
    Driver.findById(req.params.id)
    // .populate('cars')
    .then(driver => {
      res.json({driver:driver, message: "suc"})
    }).catch(err => {
      res.json({message: err })
    })
  })
  
  app.post('/drivers/new', (req, res) => {
    //find drivers
    let inputData = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      age: req.body.age,
      image: req.body.image
    }
  
    let driver = new Driver(inputData)
  
    driver.save().then(() => {
      res.json({ message: "Driver Added!"})
      return false
    })
    .catch(err => {
        res.json({ message: err})
    })
  
  })
  
  app.put('/driver/:id', (req, res) => {
    //find drivers 5cc31a3ba5893a210fa23428"
    let inputData = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      age: req.body.age,
      image: req.body.image
    }
  
    Driver.findOneAndUpdate({_id: req.params.id},{$set:inputData}).then(driver => {
      res.status(200).json({...driver})
    }).catch(err => {
      res.json({message: err })
    })
  })
  // {
  // 	"cars" : "5cc3d7fbc4d7f129d8eef709",
  // 	"fuel": "half",
  //   "picked": "2019/03/04",
  //   "dropped": "2019/03/05"
  // }
  
  
  // {
  //     "firstname": "Okon",
  //     "lastname": "Abdullah",
  //     "age": 30,
  //     "image": "https://m.easyaupair.com/Photo/small_aupair_d338b414d261a292cf3db541c57fec59.jpg"
  //   }
  //
  //add car to drivers
  app.put('/drivers/:id/cars/add', (req, res) => {
    let inputData = {
      car:req.body.car,
      fuel:req.body.fuel,
      picked:req.body.picked,
      dropped: req.body.dropped
    }
  
    Car.findById(req.params.car).then(car => {
      //find drivers
      Driver.findOneAndUpdate({_id: req.params.id},{$push:{ cars: inputData}})
      .then(driver => {
        res.status(200).json({message: "updated"})
      }).catch(err => {
        res.json({message: err })
      })
    }).catch(err => {
      res.json({message: err })
    })
  })
  
  
//...........................................
//3- Car Routes

app.post('/cars/new', (req, res) => {

    let inputData = {
      name: req.body.name,
      image: req.body.image,
      model: req.body.model,
      doors: req.body.doors,
      purchased : req.body.purchased,
    }
  
    Car.create(inputData)
    .then(() => {
      res.json({ message: "Car Added!"})
      return false
    })
    .catch(err => res.json({message: err}))
  
    // car.save()
  })
  
  app.get('/cars', (req, res) => {
  
    Car.find({}).then(car =>{
      res.status(200).json({ count:car.length, cars : car })
      return false
    })
    .catch(err => {
      res.json({ message: err })
      return false
    })
  })
  

app.listen(5003,()=>{
    console.log("Run at Port 5003")

})