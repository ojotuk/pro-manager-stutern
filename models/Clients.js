const Leaves = require('./Leaves')
const Employees = require('./Employees')
const mongoose = require("./init");
const passportLocalMongoose = require("passport-local-mongoose");
const { Schema } = require("mongoose");

const companySchema = new mongoose.Schema({
  companyName:{
      type:String,
      required:true
  },
  companyEmail:{
    type:String,
    required:true
  },
  companyPhone:{
    type:String,
    required:true
  },
  companyRefNo:{
    type:String,
    required:true
  },
  numberOfEmployee:{
    type:String,
    required:true
  },
  state:{
    type:String,
    required:true
  },
  employees:[{
        type:Schema.Types.ObjectId,
        ref:'Employees'
      }],
  memo:[{
        type:Schema.Types.ObjectId,
        ref:'TimeSheet'
      }],
  tasks:[{
        type:Schema.Types.ObjectId,
        ref:'Task'
      }],
});


const Company = (module.exports = mongoose.model("Company", companySchema));
