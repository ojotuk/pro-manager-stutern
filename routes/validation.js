const express = require('express')

const { requireJWT } = require('../middleware/auth')

const router = express.Router()

router.get('/validation',requireJWT,(req, res) => {
  // console.log(req.user['_doc'].userType, 'valid');

  //Ensure this user a client, check client code
  if(req.user['_doc'].userType!='CL04') return res.status(401);
  //
  res.json({status:200,message:'you are signed in'})

  })
router.get('/validation-01',requireJWT,(req, res) => {
  // console.log(req.user['_doc'].userType, 'valid');

  //Ensure this user a client, check client code
  if(req.user['_doc'].userType!='HR01') return res.json({status:401,message:'relogin'});
  //
  res.json({status:200,message:'you are signed in'})

  })


module.exports = router
