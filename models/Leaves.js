const mongoose = require("./init");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;
const Profiles = require("./Profiles");

const leaveSchema = new mongoose.Schema({
  type: {
    type: String,
    default: "lest leaves",
  },
  commence: {
    type: String,
    required: true,
  },
  ends: {
    type: String,
    required: true,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
  },
  applicant: {
    type: Schema.Types.ObjectId,
    ref: "Profiles",
  },
});

const Profile = (module.exports = mongoose.model("Leaves", leaveSchema));
