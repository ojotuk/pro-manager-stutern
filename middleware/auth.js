const passport = require("passport");
const JWT = require("jsonwebtoken");
const PassportJWT = require("passport-jwt");
const User = require("../models/User");
const Profile = require("../models/Profiles");
const Client = require("../models/Clients");
const randomstring = require("randomstring");
const Employees = require("../models/Employees");
const jwtSecret = process.env.JWT_SECRET;
// const jwtAlgorithm = process.env.JWT_ALGORITHM
const jwtAlgorithm = "HS256";
const jwtExpiresIn = process.env.JWT_EXPIRES_IN;

passport.use(User.createStrategy());

/*                  SIGNUPs                         */
// Client/Company
const signUp = async (req, res, next) => {
  if (!req.body.companyEmail || !req.body.companyPhone) {
    res.status(400).send("No username or password provided.");
  }
  // check if email exist
  const exist = await User.findOne({ email: req.body.companyEmail });
  if (exist) return res.status(401).json({ msg: "account exist" });

  // Email has not been used
  const generateRefNo = randomstring.generate({
    length: 4,
    charset: "numeric",
    readable: true,
  });

  const user = {
    email: req.body.companyEmail,
    userType: "CL04",
    companyRefNo: `HR-CL-${generateRefNo}`,
    emailVerified: false,
  };
  const userInstance = new User(user);
  User.register(userInstance, req.body.password, (error, user) => {
    if (error) {
      next(error);
      return;
    }
  });
  const clientInstance = new Client(userInstance);
  clientInstance.companyName = req.body.companyName;
  clientInstance.companyPhone = req.body.companyPhone;
  clientInstance.companyEmail = req.body.companyEmail;
  clientInstance.companyRefNo = userInstance.companyRefNo;
  clientInstance.state = req.body.state;
  clientInstance.numberOfEmployee = "50";
  clientInstance.save((error, doc) => {
    if (error) {
      next(error);
      return;
    }
  });
  req.user = userInstance;
  next();
};


// client action for adding an employee
const signUpEmployee= async (req, res) => {
  const {firstName,lastName, jobTitle, email,employmentType,department,salary,hireDate} = req.body;
  const password = `${lastName}$${email}`
  const generateID = () =>
    randomstring.generate({
      length: 4,
      charset: "alphanumeric",
      readable: true,
    });
    const company = await Client.findOne({companyEmail:req.user.email});

    let newEmployee = {
      email,
      firstName,
      lastName,
      hireDate,
      jobTitle,
      employmentType,
      department,
      salary,
      userType: "CL05",
      employeeID: `CL05-${generateID()}`,
      companyRefNo: company.companyRefNo,
      emailVerified:false,
      company:company._id           //foreign key
    }
//create auth account for signing in
    const userInstance = new User(newEmployee);
    User.register(userInstance, password, (error, user) => {
      if (error) {
       
        return res.status(500);
      }
    });

    const employeeInstance = new Employees(newEmployee)
    const employed = await employeeInstance.save();
    company.employees.push(employed._id);
    await company.save();
    res.json({code:200, msg:"all good"})


};

/*                  SIGN JWTS                        */
//Clients
const signJWTForCompany = (req, res) => {
  const user = req.user;
  const { email, userType } = user;
  const token = JWT.sign(
    {
      email: email,
      userType: userType,
    },
    jwtSecret,
    {
      algorithm: jwtAlgorithm,
      expiresIn: jwtExpiresIn,
      subject: user._id.toString(),
    }
  );
  // console.log(token)
  res.json({ token });
};
//Clients Employee
const signJWTForUserEmployee = (req, res) => {
  // console.log('signing jwt', req.body)
  const { email, userType } = req.user;
  // console.log(userType)
  if (userType !== "CL05")
    return res.status(400).json({ msg: "not authorized" });
  const token = JWT.sign(
    {
      email: email,
      userType: userType,
    },
    jwtSecret,
    {
      algorithm: jwtAlgorithm,
      expiresIn: jwtExpiresIn,
      subject: user._id.toString(),
    }
  );
  // console.log(token)
  res.json({ token });
};

passport.use(
  new PassportJWT.Strategy(
    {
      jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
      algorithms: [jwtAlgorithm],
    },
    (payload, done) => {
      User.findById(payload.sub)
        .then((user) => {
          if (user) {
            done(null, user);
          } else {
            done(null, false);
          }
        })
        .catch((error) => {
          done(error, false);
        });
    }
  )
);

module.exports = {
  initialize: passport.initialize(),
  signUp,
  signUpEmployee,
  signIn: passport.authenticate("local", { session: false }),
  requireJWT: passport.authenticate("jwt", { session: false }),
  signJWTForCompany,
};
