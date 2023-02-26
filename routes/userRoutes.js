const express = require('express');
const userRouter = express.Router();
const auth = require('../Middleware/auth')
const { userlogin, usersignup, savelogin } = require('../controller/userController')

const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

userRouter.post('/login', asyncHandler(userlogin))
userRouter.post("/signup", asyncHandler(usersignup));
userRouter.get("/loggedIn", auth, asyncHandler(savelogin));


module.exports = userRouter;