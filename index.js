const express = require('express')
const cors=require("cors");
const morgan = require("morgan");
const dotenv=require("dotenv");
const connectDb = require('./config/db');


//dot env configuration
dotenv.config();

//DB connection
connectDb();

//rest object
const app= express()

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
//route
//url=> http://localhost:9000
app.use('/api/v1/test',require('./routes/testRoutes'));
app.use('/api/v1/auth',require('./routes/authRoutes'));
app.use('/api/v1/user',require('./routes/userRoutes'));
app.use('/api/v1/restaurant',require('./routes/restaurantRoutes'));
app.use('/api/v1/category',require('./routes/categoryRoutes'));
app.use('/api/v1/food',require('./routes/foodRoutes'));

app.get('/',(req,res)=>{
    return res.status(200).send("<h1>welcome to food server app api based project</h1>");
});

//port
const PORT = process.env.POR||9000 ;

//listen
app.listen(PORT ,()=>{
    console.log(`server running on ${PORT}`);
});