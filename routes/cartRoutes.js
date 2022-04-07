const express = require('express');
const router = express.Router();
const User = require('../models/user')
const Product=require('../models/product')
const {isLoggedIn}=require('../middleware')



//adding to cart
router.post('/cart/:productid/add',isLoggedIn, async(req, res) => {
     const { productid } = req.params;
     const product = await Product.findById(productid);

     const currentUser = req.user;
     currentUser.cart.push(product);

     await currentUser.save();
     req.flash('success', 'Item added to your cart successfully');
     res.redirect(`/products/${productid}`);
})

//display cart
router.get('/user/cart',isLoggedIn,async (req, res) => {
     
     const uid = req.user._id;
     const user = await User.findById(uid).populate('cart');

     res.render('cart/userCart',{user});

})


router.get('/user/confirmation',isLoggedIn,async (req, res) => {
     
     const uid = req.user._id;
     const user = await User.findById(uid).populate('cart');

     res.render('auth/orderPlaced',{user});

})

//remove from the cart
router.delete('/cart/:id/item/:itemId',async(req,res)=>{

    const { id, itemId } = req.params;

    await User.findByIdAndUpdate(id, { $pull: { cart: itemId } });

    res.redirect('/user/cart');
})














module.exports = router;