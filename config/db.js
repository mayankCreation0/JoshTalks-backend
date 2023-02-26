const mongoose = require('mongoose')
mongoose.set('strictQuery',true);
require('dotenv').config();
async function connect(){
 return new Promise((resolve,reject)=>{
    mongoose.connect(process.env.DB,(err)=>{
        if(err){
            reject(err);
        }
        resolve();
    })
 })
}

module.exports=connect;