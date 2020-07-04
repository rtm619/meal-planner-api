require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const passportConfig = require('./config/passport')
const authModule = require('./routes/auth')
const mealsModule = require('./routes/meals')

const app = express()

// Configure Express Middlewares
passportConfig.initialize(app)
app.use(bodyParser.json())
app.use(cors())

// Init Modules Here
app.use('/auth', authModule)
app.use('/meals', mealsModule)

// Connect to DB and then start the server.
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  app.listen(process.env.PORT, () =>
    console.info(`app listening on port ${process.env.PORT}!`),
  );
});