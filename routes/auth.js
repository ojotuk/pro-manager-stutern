const express = require('express')
const {
  signUp,
  signUpClientEmployees,
  signIn,
  requireJWT,
  signJWTForUser
} = require('../middleware/auth')

const router = express.Router()

// Sign up client
router.post('/auth/sign-up', signUp, signJWTForUser)

// Sign up client employees MANY
router.post('/auth/sign-up/004/employees', requireJWT,signUpClientEmployees)


// Sign in client
router.post('/auth', signIn, signJWTForUser)

module.exports = router
