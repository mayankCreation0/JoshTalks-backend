const userModel =require('../models/userModels');

const bcrypt =require('bcrypt');

const jwt = require('jsonwebtoken');


 const getAllUser= async()=>{
    try{
 const users = await userModel.find().sort("-createdAt");
 return {
    "status":"success",
    "data": users
 }
    }catch(e){
        return {
            "status":"failed",
            "data": e.message
         }
    }
 }
const userRegister = async (data)=>{
    //   return data
    const user =await userModel.findOne({email:data.email});
    console.log(data.email);
    // return data.email;
    if(user){
        return {
            "status": "failed",
            "message": 'Email already exists'
        }
    }
    else{
        if(data.name && data.email && data.password ){
            try{
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(data.password, salt);
                const newUser= new userModel({
                    name: data.name,
                    email: data.email,
                    password:hashPassword,
                    
                   })
                 const temp=  await userModel.create(newUser);
                 console.log(temp);
                 const registeredUser= userModel.findOne({email:data.email})
                 
                //  Generate JWT token

                const token  = jwt.sign({userId:registeredUser._id},process.env.JWT_SECRET_KEY,{expiresIn:'5d'})
                 
                 return {
                    "status": "success",
                    "message": 'User Registered Successfully',
                    "token": token
                }
            }catch(e){
                return {
                    "status": "failed",
                    "message": e.message
                }
            }
          
        }else{
            return {
                "status": "failed",
                "message": 'All fields are required'
            }
        }
    
}
}

const userLogin =async(data)=>{
    try{
 const {email,password}=data;
 if(email && password){
    const user = await userModel.findOne({ email: email});
    const token  = jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'5d'})
    if(user !=null){
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch && (user.email === email)){
            return {
                "status": "success",
                "message": 'Login Successfull',
                "token": token
            }
        }else{
            return {
                "status": "failed",
                "message": 'Email or password is incorrect',
            }
        }
    }else{
        return {
            "status": "failed",
            "message": 'User is not Registered',
        }

    }
 }else{
    return {
        "status": "failed",
        "message": 'All fields are required'
    }
 }
    }catch(e){
        return {
            "status": "failed",
            "message": 'User is not Registered',

        }
    }
}

const changePassword=async(data,id)=>{
      const {password,confirmPassword} =data;
      if(password && confirmPassword){
            if(password !==confirmPassword){
                return {
                    "status": "failed",
                    "message": 'Password does not match'
                }
            }else{
                const salt =await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(password,salt);
               await  userModel.findByIdAndUpdate(id,{$set:{
                password:hashPassword
               }})
                return{
                "status": "success",
                "message": 'Password Updated Successfully',
              }
            }
      }else{
        return {
            "status": "failed",
            "message": 'All fields are required'
        }
      }
}
const loggedInUser = async (data)=>{
 return {
    "user":data
 }
}




module.exports={
    userRegister,
    userLogin,
    changePassword,
    loggedInUser,
    getAllUser
}