const Employees = require('../../../models/Employees')
const Leaves = require('../../../models/Leaves')


// my profile
const myProfile = async  (req,res)=>{
    const userType = req.user.userType;
    if(userType!=="CL05") return res.status(400).json({msg:"access denied"});
    try {
        const employee = await Employees.findOne({email:req.user.email}).populate([{
            path:'task',
            populate:[{
                path:'teams',
                select:['firstName','lastName']
            },{
                path:'teamLead',
                select:['firstName','lastName']
            }]
        },
        {path:'company',select:['companyName','companyEmail']},
        {path:'leaves'},
        {path:'attendance'},
    ]);
        if(employee) return res.json(employee)
    } catch (error) {
        return res.json(error)
    }
    // res.send('ok')

}



module.exports = {
    myProfile
}