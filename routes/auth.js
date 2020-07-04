const router = require('express').Router()
const passport = require('passport')

router.post('/sign-in', passport.authenticate('local', {
  session: false
}), (req, res) => {
  console.log(req.user);
    if (!req.user) {
        res.send("Incorrect");
    } else {
        var token = jwt.sign({
            email: req.user.email
        }, 'mysecretkey', {
            expiresIn: 64000
        });
        var resObject = {
            user: req.user,
            auth_token: token
        }
        res.send(resObject);
    }
})

router.post('/sign-up', (req, res) => {
  
})

router.get('/sign-out', (req, res) => {

})

module.exports = router