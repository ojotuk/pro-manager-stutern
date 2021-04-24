const Profiles = require('./../../../models/Profiles')
const Leaves = require('./../../../models/Leaves')
const Company = require('./../../../models/Clients')
const Employees = require('./../../../models/Employees')



// add leaves
const getEmployees = async (req,res)=>{
    const {email} = req.user;
    const client = await Company.findOne({companyEmail:email}).populate(['employees'])
        
        res.json({client, code:200});
}

//Get an emplyee profile
const getEmployee = async (req,res)=>{
    const clientRef = req.user.clientRefNo;
    // const {id} = req.params;
    const id = "608451938b3468065806d85d"
    // console.log(id);
    const user =await Employees.findOne({_id:id}).populate('company')
       
        res.json({profile:user, code:200});
    
}



module.exports = {
    getEmployees,
    getEmployee
}