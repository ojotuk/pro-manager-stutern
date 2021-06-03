const Clients = require("../../../models/Clients");
const Attendance = require("../../../models/Attendance");



const viewAttendance = async (req, res) => {
  const { email, userType } = req.user;
  if (userType !== "CL04")
    return res.status(400).json({ msg: "access denied" });
    try {
      const client = await Clients.findOne({companyEmail:email});
      if(!client) return res.status(404).json({message:"Client not found"})
      // console.log(client)
      const clientId= client._id;
      const applications = await Attendance.find({ company: clientId }).populate(
      "applicant"
    );
    return res.json({ applications });
    } catch (error) {
     return res.status(500) 
    }
  
};

module.exports = {
  viewAttendance,
};
