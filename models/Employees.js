const Leaves = require('./Leaves')
const Company= require('./Clients')
const mongoose = require("./init");
const passportLocalMongoose = require("passport-local-mongoose");
const { Schema } = require("mongoose");

const employeeSchema = new mongoose.Schema({
  address: {
    type: String,
    default: "",
  },
  bankInfo: {
    type: Object,
    default: { bankName: "", bankAcctNo: "" },
  },
  basicSalaryInfo: {
    type: Object,
    default: {
      salaryType: "",
      salaryAmountPerMonth: "",
      paymentType: "",
    },
  },
  companyRefNo:{
    type: String,
    required: true,
  },
  email: { type: String, index: true, unique: true },
  attendance:[{
    type:Schema.Types.ObjectId,
    ref:'Attendance'
  }],
  leaves:[{
    type:Schema.Types.ObjectId,
    ref:'Leaves'
  }],
  memo:[{
    type:Schema.Types.ObjectId,
    ref:'TimeSheet'
  }],
  task:[{
    type:Schema.Types.ObjectId,
    ref:'Task'
  }],
  company:{
    type:Schema.Types.ObjectId,
    ref:'Company'
  },
  userType: {
    type: String,
    required: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  emergencyContact: {
    type: Array,
    default: [{ name: "", address: "", relationship: "" },{ name: "",address: "", relationship: "" }]
  },
  department:{
    type: String,
    required:true,
  },
  hireDate:{
    type: String,
    required:true,
  },
  employeeID: {
    type: String,
    required:true,
  },
  jobTitle: {
    type: String,
    required:true,
  },
  employmentType:{
    type: String,
    required:true,
  },
  gender: {
    type: String,
    default: "",
  },
  messages:{
      type:Array,
      default:[]
  },
  firstName:{
    type: String,
    required:true
  },
  lastName:{
    type: String,
    required:true
  },
  position: {
    type: String,
    default: "",
  },
  permissions: {
    type: Array,
    default: [],
  },
  personalInfo: {
    type: Object,
    default: { maritalStatus: "", religion: "", nationality: "" },
  },
  phone: {
    type: String,
    default: "",
  },
  dob:{
    type:String,
    default:"01/01/1970"
  },
  workPhone:{
    type:String,
    default:""
  },
  workEmail:{
    type:String,
    default:""
  },
  supervisedBy: {
    type: String,
    default: "",
  },
});


const Employees = (module.exports = mongoose.model("Employees", employeeSchema));
