const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const { saveRedirectUrl } = require('../middelware.js');

const userControllers = require('../controllers/user');

router.get('/signup', userControllers.getsignupRoute);
  
  router.post('/signup', userControllers.postsignupRoute);
  
  

router.get('/login' , userControllers.getloginRoute)

router.post('/login' , saveRedirectUrl ,  passport.authenticate("local", {
    failureRedirect : "/login",
    failureFlash : true,
}), userControllers.postloginRoute)

router.get("/logout", userControllers.logoutRoute);

module.exports = router;