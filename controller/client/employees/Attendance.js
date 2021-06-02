// const Profiles = require('./../../../models/Profiles')
// const Attendance = require('./../../../models/Attendance')
const Attendance = require("../../../models/Attendance");
const Employees = require("../../../models/Employees");
// const Company = require('../../../models/Clients')

// checkin
const checkIn = async (req, res) => {
  const { email, userType } = req.user;
  const { date, time, company, applicant } = req.body;
  try {
    const today = new Date();

    if (userType !== "CL05")
      return res.status(401).json({ msg: "access denied" });
    //check if checked in for today
    const exist = await Attendance.findOne({
      date: today.toDateString(),
      applicant: applicant,
    });
    if (exist)
      return res.status(400).json({ message: "check is done once a day" });

    const newAttendance = {
      date: date,
      checkIn: Number(time),
      company,
      applicant,
    };
    const applicantProfile = await Employees.findOne({
      email: email,
      _id: applicant,
    });
    if (!applicantProfile)
      return res.status(404).json({ message: "user not found" });

    const AttendanceInstance = new Attendance(newAttendance);
    // save attendance ref to applicanat profile
    const attendanceId = AttendanceInstance._id;
    applicantProfile.attendance.push(attendanceId);
    applicantProfile.markModified("attendance");
    applicantProfile.save();

    // save attendance;
    const attendance = await AttendanceInstance.save();
    return res.json({code:201, attendance: attendance });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

const checkOut = async (req, res) => {
  const { email, userType } = req.user;
  const { date, time, company, applicant } = req.body;

  // console.log('here')
  try {
    if (userType !== "CL05")
      return res.status(401).json({ msg: "access denied" });

    const today = new Date();

    const profile = await Attendance.findOne({
      date: today.toDateString(),
      applicant: applicant,
    });
    // console.log(profile)
    if (!profile || !profile.checkIn)return res.status(403).json({ message: "you didnt check in for today" });
    if (profile.checkOut) return res.status(301).json({ message: "you are done for today" });

    profile.checkOut = Number(time);
    const update = await profile.save();
    return res.json({ code: 201, doc: update });
  } catch (error) {
    return res.status(500).json({ code: 201, error });
  }
};

module.exports = {
  checkIn,
  checkOut,
};
