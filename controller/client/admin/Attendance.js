const Profiles = require("../../../models/Profiles");
const Leaves = require("../../../models/Leaves");

// approve
const approveLeave = async (req, res) => {
  const { decision,  reason } = req.body;
  const id = req.params.id;
  const { userType } = req.user;
  if (userType !== "CL04")
    return res.status(400).json({ msg: "access denied" });
  try {
    const application = await Leaves.findOne({ _id: id });
    application.status = decision;
    application.isAttended=true;
    if(reason){
        application.rejectReason=reason
    }
    const update = await application.save();
    return res.status(201).json({ message: "ok", update });
  } catch (error) {
    return res.status(500).json({ message: "not ok" });
  }
};

const viewLeaves = async (req, res) => {
  const { email, userType } = req.user;
  if (userType !== "CL04")
    return res.status(400).json({ msg: "access denied" });
  const applications = await Leaves.find({ company: email }).populate(
    "applicant"
  );

  res.json({ applications });
};

module.exports = {
  approveLeave,
  viewLeaves,
};
