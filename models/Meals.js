const mongoose = require('mongoose')

const mealsSchema = new mongoose.Schema({
  mealId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true
  },
  calories: {
    type: Number,
    required: true,
    min: 1,
  },
  userEmail: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
})

const mealsModel = mongoose.model('Meals', mealsSchema)

module.exports = mealsModel