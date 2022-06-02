const express=require('express');
const app = express();


const bodyParser = require('body-parser');
const mongoconnect = require('mongoose');
require('dotenv/config');
const cors = require('cors');

const port = process.env.PORT || 3000;

var allowlist = ['http://localhost:4201', 'http://localhost:4200']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

//Package middleware
app.use(cors(corsOptionsDelegate));
app.use(express.urlencoded({limit: '50mb',
parameterLimit: 100000,
extended: true}))
app.use(express.json({limit: '50mb'}))
//Db connection
mongoconnect.connect(process.env.DB_CONNECT,{
    useNewUrlParser:true,useUnifiedTopology:true},()=>{
        console.log('Mongodb Connected');
})

//Routes imports
const productRoute = require('./Routes/product');

//Route middleware
app.use('/product',productRoute)

//These is used to allow access to the images folder
app.use('/public',express.static('public'));  
app.use('/images', express.static('images')); 

//Server poor
app.listen(port,()=>{
    console.log('Port running at 3000');
})