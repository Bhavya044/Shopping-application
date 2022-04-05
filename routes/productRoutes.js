const express = require("express");

const router = express.Router();
const Product = require("../models/product");
const Review = require("../models/review");
const {isLoggedIn, isSeller}=require('../middleware')

//home route
router.get('/', (req, res) => {
    res.render('products/home');
})

//Get all the products from db
router.get("/products", async (req, res) => {
      try {
          const products = await Product.find({});

  res.render("products/index", { products });
      } catch (error) {
        req.flash('error', 'Try again..something is wrong');
        res.redirect('/error');
      }

});

//get the addNew form
router.get("/products/new",isLoggedIn, (req, res) => {
  res.render("products/new");
});

//create new product with the given payload
router.post("/products", isLoggedIn, async (req, res) => {
  const newProduct = {
    ...req.body,
  };

  await Product.create(newProduct);
  req.flash('success','New product created successfully')

  res.redirect("/products");
});

//show a particular product
router.get("/products/:id", async (req, res) => {
try {
    const { id } = req.params;
  const product = await Product.findById(id).populate("reviews");

  res.render("products/show", { product});
} catch (error) {
  req.flash('error', 'Oops,Something went wrong');
  res.redirect('/error');
}
});

//editing the product and getting the edit form prefilled with data
router.get("/products/:id/edit",isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/edit", { product });
});

//updating the product
router.patch("/products/:id",isLoggedIn, async (req, res) => {
  const updatedProduct = req.body;
  const { id } = req.params;
  await Product.findByIdAndUpdate(id, updatedProduct);
  res.redirect(`/products/${id}`);
});

//deleting the product
router.delete("/products/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.redirect("/products");
});

//CREATING A REVIEW FOR EACH PRODUCT
router.post("/products/:id/review",isLoggedIn, async (req, res) => {
 
 try {
    const { id } = req.params;
  const product = await Product.findById(id);

  const {rating, comment } = req.body;

  const review = new Review({ user:req.user.username, rating, comment });
  // console.log(review);
   

  product.reviews.push(review);
  await product.save();
  await review.save();

  req.flash('success', 'Created review successfully');

   res.redirect(`/products/${id}`);
   
 } catch (error) {  
   req.flash('error', error.message);
   res.redirect('/login')
 }
});





module.exports = router;
