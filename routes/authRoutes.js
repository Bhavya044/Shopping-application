const express = require('express');
const { Passport } = require('passport/lib');
const router = express.Router();
const User = require('../models/user')
const passport=require('passport');
const { isLoggedIn } = require('../middleware');


// router.get('/fakeUser',async (req, res) => {
//      const user = new User({
//           username: 'Bhavya',
//           email: 'bhavya@gmail.com',
//      })
//      const newUser = await User.register(user, 'bhavya04'); //inbuilt register method makes new user and accepts two arguments-username,password
     
//      res.send(newUser);
     
// })



//get the signup form
router.get('/register', (req, res) => {
     res.render('auth/signup');
})



//register new user in db
router.post('/register', async(req, res) => {
     try {
          const { username, email, password } = req.body;
     const user = new User({
          username: username,
          email:email
     })
          const newUser = await User.register(user, password);
          // console.log(newUser)
          req.flash('success', `Dear ${username},You have been successfully registered!✌️.Please login to continue`)
     res.redirect('/products');
        
     } catch (error) {
          req.flash('error', error.message);
        res.redirect('/register')
   }
})


//get the login page
router.get('/login', (req, res) => {
     res.render('auth/signin');
})


//authenticate and login
router.post('/login',
     passport.authenticate('local', {
          // successRedirect: '/',
          failureRedirect: '/login',
          failureFlash: true
     }), (req, res) => {
          const { username } = req.user;
          req.flash('success', `Welcome back, ${username}`);
          res.redirect('/products');
     });



//logout
router.get('/logout', (req, res) => {
  req.logout();
     req.flash('success', 'Logged out successfully');
     res.redirect('/login');
})



//payment route
router.get('/payment',isLoggedIn, async(req, res) => {

          const uid = req.user._id;
     const user = await User.findById(uid).populate('cart');
     res.render('auth/payment',{user})

})




module.exports = router;