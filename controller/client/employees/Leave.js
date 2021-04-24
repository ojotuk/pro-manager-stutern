const Profiles = require('../../../models/Profiles')
const Leaves = require('../../../models/Leaves')


// add leaves
const addLeave = async  (req,res)=>{
    const userType = req.user.userType;
    if(userType!==005) return res.status(400).json({msg:"access denied"});
    res.send('ok')

}
c


module.exports = {
    addLeave
}