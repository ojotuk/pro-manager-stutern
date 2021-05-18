const express = require('express')
const {
  signUp,
  signIn,
  requireJWT,
  signJWTForCompany,
  signUpEmployee
} = require('../middleware/auth')

const router = express.Router()

// Sign up client
router.post('/auth/signup', signUp, signJWTForCompany)

// Sign up an employee
router.post('/auth/sign-up/005/add', requireJWT,signUpEmployee)



// Sign in client
router.post('/auth/signin', signIn, signJWTForCompany)
// Sign in employee
// router.post('/auth/client/005', signIn, signJWTForUserEmployee);


module.exports = router
