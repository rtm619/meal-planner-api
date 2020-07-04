const router  = require('express').Router()
const passport = require('passport')

const mealSchema = require('../models/Meal')
const dbHelper = require('../utils/db.helper')

router.post('/add', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  if(!req.user) {
    res.status(401).json({
      status: 401,
      error: 'Invalid Token. User not authenticated.'
    })
  }
  const mealObject = {
    mealId: `${req.body.name}-${(Math.random() * 1000).toFixed(0)}`,
    name: req.body.name,
    date: new Date(req.body.date),
    calories: Number(req.body.calories),
    userEmail: req.user
  }
  dbHelper.add(mealSchema, mealObject).then(dbRes => {
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
