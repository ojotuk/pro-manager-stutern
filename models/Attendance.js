const mongoose = require("./init");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;
const Profiles = require("./Profiles");

const attendanceSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  expectedCheckIn: {
    type: String,
    default: "8:00 AM",
  },
  expectedCheckOut: {
    type: String,
    default: "4:00 PM",
    
  },
  checkIn: {
    type: Number,
    required: true,
  },
  checkOut: {
    type: Number,
    default: "",
  },
  company: {
    type: String,
    required: true,
  },
  applicant: {
    type: Schema.Types.ObjectId,
    ref: "Employees",
  },
});

const Profile = (module.exports = mongoose.model(
  "Attendance",
  attendanceSchema
));
