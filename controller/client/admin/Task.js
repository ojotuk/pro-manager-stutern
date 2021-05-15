const Profiles = require('./../../../models/Profiles')
const Leaves = require('./../../../models/Leaves')
const Task = require('../../../models/Task')
const Employees = require('../../../models/Employees')

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
      taskInstance.save((error, doc) => {
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
        //
        return res.json({code:201,doc})
      });
}





module.exports = {
    assignTask
}