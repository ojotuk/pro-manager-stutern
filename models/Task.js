const mongoose = require("./init");
const passportLocalMongoose = require("passport-local-mongoose");
const Employees = require("./Employees")


// 
const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required:true
  },
  teams:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Employees'
  }],
  end:{
    type: String,
    default:""
  },
  start: {
    type: String,
    required:true
  },
  description: {
    type: String,
    default: "",
  },
  progress:{
    type:Number,
    default:0
  },
  teamLead:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Employees",
  },
  company:{
    type:String,
    require:true,
  }
});


const Task = (module.exports = mongoose.model("Task", TaskSchema));