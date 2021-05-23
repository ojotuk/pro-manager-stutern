// const Profiles = require('./../../../models/Profiles')
// const Leaves = require('./../../../models/Leaves')
const Task = require('../../../models/Task')
// const Employees = require('../../../models/Employees')
// const Company = require('../../../models/Clients')

// 
const updateTaskProgress = async (req,res)=>{

  const {email,userType} = req.user;
  try {
    const tasks =await Task.findById(req.params.id);
    // console.log(tasks)
    if(tasks){
      tasks.progress = Number(req.body.progress);
      tasks.markModified('progress')
      tasks.save()
      return res.json({tasks,code:201})
    }
    return res.json({code:404,tasks:[]})
  } catch (error) {
    return res.json({code:500,error}) 
  }

}




module.exports = {
    updateTaskProgress
}