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
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
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
    default: () => new Date().toISOString().substring(0, 10),
  },
});

const TodoModel = mongoose.model("todo", todoSchema);

module.exports = TodoModel;
