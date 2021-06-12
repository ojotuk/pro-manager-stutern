const Employees = require("../../../models/Employees");
const TimeSheet = require("../../../models/TimeSheet");



const addTimeSheet = async (req, res, next) => {
  const { email, userType } = req.user;
  if (userType !== "CL05")
    return res.status(400).json({ msg: "access denied" });
    try {

      const newTime = new TimeSheet(req.body);
      const timeId = newTime._id;

      const client = await Employees.findOne({companyEmail:email});
      if(!client) return res.status(404).json({message:"Client not found"})
      // console.log(client)
      const clientId= client._id;
      newTime.user=clientId;
      const ts = await newTime.save();

      client.memo.push(timeId);
      client.markModified('memo');
      await client.save()
    next()
    // return res.json({ ts });
    } catch (error) {
     return res.status(500) 
    }
  
};

module.exports = {
  addTimeSheet,
};
