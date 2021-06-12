const Profiles = require("./../../../models/Profiles");
const Leaves = require("./../../../models/Leaves");
const Company = require("./../../../models/Clients");
const Employees = require("./../../../models/Employees");
const User = require("./../../../models/User");

// employees
const getEmployees = async (req, res) => {
  const { email } = req.user;
  const client = await Company.findOne({ companyEmail: email }).populate([
    "employees",
    {
      path: "tasks",
      populate: {
        path: "teams",
      },
    },
    "memo"
  ]);
  if (client) {
    return res.json({ client, code: 200 });
  }
  return res.json({ client: [], code: 404 });
};

//Get an emplyee profile
const getEmployee = async (req, res) => {
  const clientRef = req.user.clientRefNo;
  const { id } = req.params;
  // const id = "608451938b3468065806d85d"
  // console.log(id);
  const user = await Employees.findOne({ _id: id }).populate([
    {
      path: "company",
      populate: {
        path: "employees",
      },
    },
    {
      path: "task",
      populate: {
        path: "teams",
      },
    },
  ]);
  if (user) {
    return res.json({ profile: user, code: 200 });
  }
  return res.json({ profile: [], code: 404 });
};

module.exports = {
  getEmployees,
  getEmployee,
};
