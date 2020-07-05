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
    res.status(500).json({
      status: 500,
      error: err
    })
  })
})

router.get('/get-user', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  dbHelper.get(userModel, { email: req.user.email }).then(dbRes => {
    if (dbRes.length > 0) {
      res.status(200).json({
        status: 200,
        data: dbRes[0]
      })
    } else {
      res.status(404).json({
        status: 404,
        error: "User Not found!"
      })
    }
  }).catch(err => {
    res.status(500).json({
      status: 500,
      error: err
    })
  })
})

module.exports = router