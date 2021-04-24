const Profiles = require('./../../../models/Profiles')
const Leaves = require('./../../../models/Leaves')
const Task = require('../../../models/Task')   

// add leaves
const assignTask = async (req,res)=>{
    const {
        to,
        name,
        email,
        title,
        description,
        commence,
        ends,
        teams,
      } = req.body;
      const newTask = {
        name,
        title,
        description,
        commence,
        ends,
        teams,
        assignedBy: req.user.email,
        supervisedBy: email,
      };
      const taskInstance = new Task(newTask);
      taskInstance.save((error, doc) => {
        if (error) {
          return res.json({ code: 400, error });
        }
        console.log(to);
        // save to supervisor profile
        Profile.findById(to, (error, document) => {
          if (error) {
            return res.json({ code: 400, error });
          }
          let profile = document;
          if (profile) {
            // push task, push notification
            profile.task.push(doc);
            profile.save();
          }
        });
    
          // save to each team profile
          const teamsArr= teams.split(',')
          for (let team of teamsArr ){
              console.log(team,teamsArr)
            Profile.findOne({ email: team }, (err, docs) => {
              if (err) {
                return res.json({ code: 400, err });
              }
              let profile = docs;
              if (docs) {
                // push task, push notification
                profile.task.push(taskInstance);
                profile.save();
              }
            });
          }
          res.json({ code: 200, message: "message sent" });
    
        // res.json({code:200,doc})
      });
}





module.exports = {
    assignTask
}