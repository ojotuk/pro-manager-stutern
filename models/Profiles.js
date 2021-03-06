const Leaves = require('./Leaves')
const mongoose = require("./init");
const passportLocalMongoose = require("passport-local-mongoose");
const { Schema } = require("mongoose");

const profileSchema = new mongoose.Schema({
  address: {
    type: String,
    default: "",
  },
  bankInfo: {
    type: Object,
    default: { bankName: "", bankAcctNo: "", ifcsCode: "", panCode: "" },
  },
  basicSalaryInfo: {
    type: Object,
    default: {
      salaryType: "",
      salaryAmountPerMonth: "",
      paymentType: "",
    },
  },
  clientRefNo:{
    type: String,
    required: true,
  },
  email: { type: String, index: true, unique: true },
  leaves:[{
    type:Schema.Types.ObjectId,
    ref:'Leaves'
  }],
  userType: {
    type: String,
    required: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  emergencyContact: {
    type: Object,
    default: { name: "", phone: "", address: "", relationship: "" },
  },
  employeeID: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    default: "",
  },
  messages:{
      type:Array,
      default:[]
  },
  name: { type: String, default: "" },
  firstName:{
    type: String, default: ""
  },
  surname:{
    type: String, default: ""
  },
  position: {
    type: String,
    default: "",
  },
  task: {
    type: Array,
    default: [],
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
  supervisedBy: {
    type: String,
    default: "",
  },
});


const Profile = (module.exports = mongoose.model("Profile", profileSchema));
