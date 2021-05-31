const mongoose = require("./init");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;
const Profiles = require("./Profiles");

const leaveSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  commence: {
    type: String,
    required: true,
  },
  ends: {
    type: String,
    required: true,
  },
  notes:{
type:String,
required: true,

  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  status:{
    type: String,
    default: "REQUESTED",
  },
  company: {
    type: String,
    required:true
  },
  applicant: {
    type: Schema.Types.ObjectId,
    ref: "Employees",
  },
});

const Profile = (module.exports = mongoose.model("Leaves", leaveSchema));
