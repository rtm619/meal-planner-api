const router = require('express').Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')

const userModel = require('../models/User')
const dbHelper = require('../utils/db.helper')

router.post('/sign-in', passport.authenticate('local', {
  session: false
}), (req, res) => {
    if (!req.user) {
        res.status(401).json({
          status: 401,
          error: "User not found!"
        });
    } else {
        var token = jwt.sign({
            email: req.user.email
        }, process.env.SECRET_KEY, {
            expiresIn: 64000
        });
        var resObject = {
            user: req.user,
            auth_token: token
        }
        res.status(200).json({
          status: 200,
          data: resObject
        });
    }
})

router.post('/sign-up', (req, res) => {
  const { displayName, email, password } = req.body
  const data = {
    displayName,
    email,
    password,
  }
  dbHelper.add(userModel, data).then(dbRes => {
    res.status(201).json({
      status: 201,
      data: dbRes
    })
  }).catch(err => {
    res.status(400).json({
      status: 400,
      error: err
    })
  })
})

module.exports = router