# MEAL PLANNER API

This API allows you to sign up/sign in and keep track of your daily meals by storing relevant information. This API is created using Express.js, MongoDB and Passport for authentication.

## USAGE
Add a `.env` File in your root and add the following environment variables:
`DB_URL=mongodb://localhost:27017/your-db-name`
`SECRET_KEY= Any secret key for your JSON web token`
`PORT= Port number at which server will start`

Run `npm start` from console to start the Node server. It uses Nodemon to watch for file changes.

## WHAT COULD HAVE BEEN BETTER - TIME CRUNCH

1. Test cases should have been added.
2. Architecture could have been better - more modularity.

## FOLDER STRUCTURE

1. MODELS houses DB SCHEMA for different modules.
2. ROUTES houses the REST API declarations for all Modules.
3. UTILS houses any utility functions that help out modules.
4. .env file houses Environment variables that help with environment configuration.
5. CONFIG houses any configuration required for the server.

