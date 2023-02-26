const express = require('express');
const { userRegister, userLogin, changePassword, loggedInUser, getAllUser } = require('../controller/userController');
const checkUserAuth = require('../Middleware/auth');
const routes= express.Router();



routes.get('/',async(req,res)=>{
    const users= await getAllUser();
    res.send(users);
})
routes.post('/register', async(req, res)=>{
    const data =req.body;
 console.log('/',data);
        const message= await userRegister(data);
         
        res.send(message);
    

})
routes.post('/login',async(req,res)=>{
    const data =req.body;
    const message = await userLogin(data);
    if(message.status=="success"){
        res.status(200).send(message)
    }
    else{
        res.status(404).send(message);
    }
     
})

routes.post('/changePassword',checkUserAuth,async(req,res)=>{
    const data =req.body;
    const id=req.user._id;
    const message = await changePassword(data,id);
    res.send(message);
})

routes.get('/loggedInUser',checkUserAuth, async(req,res)=>{
    const data= req.user;
    const message =await loggedInUser(data);
    res.send(message);
})


module.exports= routes