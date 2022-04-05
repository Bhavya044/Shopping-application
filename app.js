
if (process.env.NODE_ENV !== 'production')
{
    require('dotenv').config();
}





const express = require('express');
const path=require('path')
const app = express();
const mongoose = require('mongoose');
const seed=require('./seed')
const productRoutes = require('./routes/productRoutes');
const authRoutes=require('./routes/authRoutes')
const methodOverride = require('method-override')
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const User=require('./models/user')
const localStrategy = require('passport-local');
const cartRoutes = require('./routes/cartRoutes');





mongoose.connect(process.env.MONGO_URL) 
    .then(() => {
    console.log('mongo connected')
    }).catch((err) => {
        console.log(err);
    })

// seed();

app.use(express.static(path.join(__dirname ,'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


//using session
const sessionConfig = {
    secret: "mySecret",
    resave: false,
    saveUninitialized:true,
}
app.use(session(sessionConfig))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));

//serializer stores unique id of your document.
passport.serializeUser(User.serializeUser());
//retrieves the document with the help of that unique id.
passport.deserializeUser(User.deserializeUser());



//this success variable will be available on each template,
// we not need to pass it in every endpoint
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    next();
})

app.use(productRoutes);
app.use(authRoutes);
app.use(cartRoutes);

app.get('/error', (req, res) => {
    res.render('error');
})

app.get('*', (req, res) => {
    res.render('wrongpage');
})










app.listen(process.env.PORT|| 3000, () => {
    console.log('Server is Up.!');
  })