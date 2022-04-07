const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = new mongoose.Schema({

     // username and hashedPassword+salt is not made because
     // we are using passport,it automatically understands
     // that using passport-local it adds username,password


     // username: {
     //      type: String,

     // },
     // password: {

     // },
     email: {
          type: String,
          required: true,
          unique: true,
          trim: true
     },
     cart: [
          {
               type: mongoose.Schema.Types.ObjectId,
               ref:'Product'
          }
     ],
     address:[
          {
               type: String,
               trim:true
          }
     ]
 

});

//but we need to plugin that username,pwd..
userSchema.plugin(passportLocalMongoose);


const User = mongoose.model('User', userSchema);
module.exports = User;
