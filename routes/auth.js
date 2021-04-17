const express = require('express')
const {
  signUp,
  signUpClientEmployees,
  signIn,
  requireJWT,
  signJWTForUser,
  signJWTForUserEmployee
} = require('../middleware/auth')

const router = express.Router()

// Sign up client
router.post('/auth/sign-up', signUp, signJWTForUser)

// Sign up client employees MANY
router.post('/auth/sign-up/004/employees', requireJWT,signUpClientEmployees)


// Sign in client
router.post('/auth', signIn, signJWTForUser)
// Sign in client
router.post('/auth/client/005', signIn, signJWTForUserEmployee);


module.exports = router
