const express= require('express');
const dotenv =require('dotenv');
dotenv.config();
const connect = require('./config/db');
const userRoute= require('./routes/userRoutes');
const todoRoute=require('./routes/todoRoutes');
const cors = require('cors')
const app=express();
const port =process.env.PORT;
app.use(cors());
app.use(express.json());
app.use('/user',userRoute);
app.use('/todo',todoRoute);
app.get('/',(req,res)=>{
    res.send("Todo App is Live Now")
 })
 connect().then(()=>{
    console.log("connected to database");
}).catch((err) =>{
    console.log(err.message);
})
app.listen(port,()=>{
    console.log(`server listening at http://localhost:${port}`);
})