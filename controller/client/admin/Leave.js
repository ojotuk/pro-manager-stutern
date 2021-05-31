const Profiles = require('../../../models/Profiles')
const Leaves = require('../../../models/Leaves')


// approve
const approveLeave = async  (req,res)=>{
    const userType = req.user.userType;
    if(userType!==004) return res.status(400).json({msg:"access denied"});
    res.send('ok')

}

const viewLeaves = async (req,res)=>{
    const {email,userType} = req.user;
    if(userType!=="CL04") return res.status(400).json({msg:"access denied"});
    const applications = await Leaves.find({company:email}).populate('applicant');

    res.json({applications})
}



module.exports = {
    approveLeave,
    viewLeaves
}