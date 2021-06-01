// const Profiles = require('./../../../models/Profiles')
// const Attendance = require('./../../../models/Attendance')
const Attendance = require('../../../models/Attendance')
const Employees = require('../../../models/Employees')
// const Company = require('../../../models/Clients')

// checkin
const checkIn = async  (req,res)=>{
  const {email,userType} = req.user;
 
  try {
      if(userType!=="CL05") return res.status(401).json({msg:"access denied"});

      const newAttendance = {
          ...req.body,
      }
      const applicantProfile =await Employees.findOne({email:email})
      const AttendanceInstance = new Attendance(newAttendance);
      // save attendance ref to applicanat profile
      const attendanceId = AttendanceInstance._id;
      applicantProfile.attendance.push(attendanceId);
      applicantProfile.markModified('leaves')
      applicantProfile.save();
  
      // save attendance;
      const attendance = await AttendanceInstance.save();
      return    res.status(201).json({attendance:attendance})
  } catch (error) {
      return    res.status(500).json({error})
      
  }
}

const checkOut =async (req,res)=>{
  const {email,userType} = req.user;
  // console.log('here', req.params.id)
  try {
      if(userType!=="CL05") return res.status(401).json({msg:"access denied"});
      const delLeave =await Attendance.findByIdAndDelete(req.params.id);
      res.json({code:201, doc:delLeave})
  } catch (error) {
      res.status(500).json({code:201, error})
  }
}




module.exports = {
  checkIn,
  checkOut,
}