const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const todoSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  createdBy:{
    type:ObjectId,
    ref:"user"
  },
  lists: [
    {
     name:{
        type:String,
     },
     status:{
        type:String,
        enum:["complete","incomplete"],
        default:"incomplete"
     }
    },
  ],
  
  date: {
    type: Date,
    default: Date.now,
  },
});

const TodoModel = mongoose.model("todo", todoSchema);

module.exports = TodoModel;
