const mongoose = require("./init");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;


const TimeSheetSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    default:""
  },
  title: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    default:"",
  },
  reminder:{
    type:Boolean,
    default:false
  },
  user: {
    type: String,
    required: true,
  }
});

const TimeSheet = (module.exports = mongoose.model("TimeSheet", TimeSheetSchema));
