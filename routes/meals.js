const router = require('express').Router()
const passport = require('passport')

const mealModel = require('../models/Meal')
const dbHelper = require('../utils/db.helper')

router.post('/add', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  if (!req.user) {
    res.status(401).json({
      status: 401,
      error: 'Invalid Token. User not authenticated.'
    })
  }
  const mealObject = {
    name: req.body.name,
    date: new Date(req.body.date),
    calories: Number(req.body.calories),
    userEmail: req.user.email
  }
  dbHelper.add(mealModel, mealObject).then(dbRes => {
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

router.put('/update/:mealId', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  if (!req.user) {
    res.status(401).json({
      status: 401,
      error: 'Invalid Token. User not authenticated.'
    })
  }
  const { mealId } = req.params
  const mealObject = {
    name: req.body.name,
    date: new Date(req.body.date),
    calories: Number(req.body.calories),
    userEmail: req.user.email
  }
  dbHelper.update(mealModel, { _id: mealId }, mealObject).then(dbRes => {
    res.status(200).json({
      status: 200,
      data: dbRes
    })
  }).catch(err => {
    res.status(500).json({
      status: 500,
      error: err
    })
  })
})

router.delete('/delete/:mealId', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  if (!req.user) {
    res.status(401).json({
      status: 401,
      error: 'Invalid Token. User not authenticated.'
    })
  }
  const { mealId } = req.params
  dbHelper.delete(mealModel, { _id: mealId }).then(dbRes => {
    res.status(200).json({
      status: 200,
      data: dbRes
    })
  }).catch(err => {
    res.status(500).json({
      status: 500,
      error: err
    })
  })
})

router.get('/get-all', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  if (!req.user) {
    res.status(401).json({
      status: 401,
      error: 'Invalid Token. User not authenticated.'
    })
  }
  dbHelper.get(mealModel, { userEmail: req.user.email }).then(dbRes => {
    res.status(200).json({
      status: 200,
      data: dbRes
    })
  }).catch(err => {
    res.status(500).json({
      status: 500,
      error: err
    })
  })
})

module.exports = router
