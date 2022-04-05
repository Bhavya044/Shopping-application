


const isLoggedIn = (req, res, next) => {
      if (!req.isAuthenticated())
  {
    req.flash('error','You need to login first')
    return res.redirect('/login');
    
     }
     next();

}
// const isSeller = (req, res, next) =>{
//      if (!req.isAuthenticated())
//      {
//           req.flash('error', "You can't add new product")
//           return res.redirect('/products');
//      }
//      next();
     
// }

module.exports = { isLoggedIn};