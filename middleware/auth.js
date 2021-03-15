const passport = require("passport");
const JWT = require("jsonwebtoken");
const PassportJWT = require("passport-jwt");
const User = require("../models/User");
const Profile = require("../models/Profiles")
const randomstring = require("randomstring");
const jwtSecret = process.env.JWT_SECRET;
// const jwtAlgorithm = process.env.JWT_ALGORITHM
const jwtAlgorithm = "HS256";
const jwtExpiresIn = process.env.JWT_EXPIRES_IN;

passport.use(User.createStrategy());


/*                  SIGNUPs                         */
const signUp = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send("No username or password provided.");
  }

  const generateRefNo=randomstring.generate({
    length: 4,
    charset: 'numeric',
    readable:true
  });

  const user = {
    email: req.body.email,
    name: req.body.name,
    userType:'CL04',
    clientRefNo:`HR-CL-${generateRefNo}`,
    emailVerified:false
  };
  const userInstance = new User(user)
  User.register(userInstance, req.body.password, (error, user) => {
    if (error) {
      next(error);
      return;
    }
  });
  const profileInstance = new Profile({isSupper:true,...user});
    profileInstance.save((err,doc)=>{
      if (err) {
        next(error);
        return;
      }
    })
  req.user = userInstance;
  next();
};

//client sign up many employee
const signUpClientEmployees = (req, res) => {
  if (!req.body.employees || req.body.employees.length<0) {
    res.status(400).send("No username or password provided.");
  }
  let employees = req.body.employees;
  // console.log(employees)
  const errorBag=[]

  const generateID=()=>randomstring.generate({
    length: 6,
    charset: 'numeric',
    readable:true
  });

  for(worker of employees){
    const user = {
      email: worker.email,
      name: worker.name,
      userType:'CL05',
      employeeID:`CL05-${generateID()}`,
      clientRefNo:req.user.clientRefNo
    }
    const userInstance = new User(user);
    User.register(userInstance, worker.password, (error, user) => {
      if (error) {
        let errItem = {affectedUser:worker.name}
        errorBag.push(errItem);
        return;
      }
    });
    const profileInstance = new Profile({isSupper:false,surname:worker.surname,firstName:worker.firstName,...user});
    profileInstance.save((error,doc)=>{
      if (error) {
        let errItem = {affectedUser:worker.name}
        errorBag.push(errItem);
        return;
      }
    })
  }

  if(errorBag.length>0){
    res.json({status:400,users:errorBag})
  }else{
    res.json({status:200,})
  }
  // req.user = user;
  // next();
};
const initClientEmployeeProfle = (req,res)=>{
  //employees to be an array
  let employees = req.body.employees;
  const generateID=()=>randomstring.generate({
    length: 4,
    charset: 'alphabetic',
    readable:true
  });

  employees = employees.map(worker=>{
    worker.userType='CL05';
    worker.clientRefNo=req.user.clientRefNo;
    worker.employeeID=`CL05-${generateID()}`;
    return worker
  })
  
  // const profile = new Profile( {
  //   email: req.body.email,
  //   emailVerified:false,
  //   name: req.body.name,
  //   userType:'CL05',
  //   employeeID:`CL05-${generateID}`,
  //   clientRefNo:req.user.clientRefNo
  // })
  // profile.save((err,doc)=>{
  //   console.log(doc)
  // })

  // Profile.create(employees).then(doc=>{
  //   console.log(doc)
  // })
}

/*                  SIGN JWTS                        */
//Clients
const signJWTForUser = (req, res) => {
  // console.log('signing jwt', req.user)
  const user = req.user;
  const token = JWT.sign(
    {
      email: user.email,
    },
    jwtSecret,
    {
      algorithm: jwtAlgorithm,
      expiresIn: jwtExpiresIn,
      subject: user._id.toString(),
    }
  );
  // console.log(token)
  res.json({ token })

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
  signUpClientEmployees,
  signIn: passport.authenticate("local", { session: false }),
  requireJWT: passport.authenticate("jwt", { session: false }),
  signJWTForUser,
};
