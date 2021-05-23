const Profiles = require('./../../../models/Profiles')
const Leaves = require('./../../../models/Leaves')
const Task = require('../../../models/Task')
const Employees = require('../../../models/Employees')
const Company = require('../../../models/Clients')

// add leaves
const assignTask = async (req,res)=>{
    const {
        title,
        description,
        end,
        start,
        teams,
        teamLead
      } = req.body;
// console.log(req.body)
      const teamIDs = teams.map(item=>item._id);
      const teamLeadID=teamLead._id;
      const allTeam = [...teamIDs,teamLeadID]
// console.log(teamIDs)
      // 
      const newTask = {
        title,
        description,
        end,
        start,
        teams:allTeam,
        company: req.user.email,
        teamLead: teamLeadID,
      };
      const taskInstance = new Task(newTask);
      taskInstance.save(async (error, doc) => {
        if (error) {
          return res.json({ code: 400, error });
        }
        // grab task id
        const taskId = taskInstance._id;
        // Save to each employee profile for ref
        allTeam.forEach(async (team)=>{
          let user =await Employees.findById(team);
          if(user){
            user.task.push(taskId);
            user.markModified('task')
            user.save()
          }
        })
      const company = await Company.findOne({companyEmail:req.user.email});
      if(company){
        company.tasks.push(taskId);
        company.markModified('tasks')
        company.save()
      }
        //
        return res.json({code:201,doc})
      });
}

const getTask = async (req,res)=>{
  const {email} = req.user;
  try {
    const tasks =await Task.find({company:email}).populate([{
    path:'teams',
    select:['firstName','lastName']
    },{
     path:'teamLead',
     select:['firstName','lastName']
    }]);
    // console.log(tasks)
    if(tasks){
      return res.json({tasks,code:201})
    }
    return res.json({code:404,tasks:[]})
  } catch (error) {
    return res.json({code:500,error}) 
  }

}




module.exports = {
    assignTask,
    getTask
}