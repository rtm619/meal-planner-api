const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
})

const userModel = mongoose.model('User', userSchema)

module.exports = userModel