// const Profiles = require('../../../models/Profiles')
const Employees = require('../../../models/Employees')
const Leaves = require('../../../models/Leaves')


// add leaves
const addLeave = async  (req,res)=>{
    const {email,userType} = req.user;
   
    try {
        if(userType!=="CL05") return res.status(401).json({msg:"access denied"});

        const newLeave = {
            ...req.body,
        }
        const applicantProfile =await Employees.findOne({email:email})
        const LeaveInstance = new Leaves(newLeave);
        // save leave ref to applicanat profile
        const leaveId = LeaveInstance._id;
        applicantProfile.leaves.push(leaveId);
        applicantProfile.markModified('leaves')
        applicantProfile.save();
    
        // save leave;
        const leave = await LeaveInstance.save();
        return    res.status(201).json({leave:leave})
    } catch (error) {
        return    res.status(500).json({error})
        
    }
}

const deleteLeave =async (req,res)=>{
    const {email,userType} = req.user;
    // console.log('here', req.params.id)
    try {
        if(userType!=="CL05") return res.status(401).json({msg:"access denied"});
        const delLeave =await Leaves.findByIdAndDelete(req.params.id);
        res.json({code:201, doc:delLeave})
    } catch (error) {
        res.status(500).json({code:201, error})
    }
}

const updateLeave =async (req,res)=>{
    const {email,userType} = req.user;
    console.log('here', req.params.id)
    try {
        if(userType!=="CL05") return res.status(401).json({msg:"access denied"});
        const delLeave =await Leaves.findOneAndUpdate({_id:req.params.id},{...req.body});
        res.json({code:201, doc:delLeave})
    } catch (error) {
        res.status(500).json({code:201, error})
    }
}



module.exports = {
    addLeave,
    deleteLeave,
    updateLeave,
}