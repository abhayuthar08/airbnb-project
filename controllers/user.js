const User = require('../models/user');

module.exports.getsignupRoute =  (req, res) => {
    res.render("users/signup");
  }

  module.exports.postsignupRoute = async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
  
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser,   
   password);   
  
  
      // Handle successful registration with auto-login
      req.login(registeredUser, (err) => {
        if (err) {
          return next(err); // Pass error to middleware for proper handling
        }
  
        req.flash('success', 'User was registered successfully!'); // Use single quotes for consistency
        res.redirect('/listings'); // Redirect to a protected route or homepage
      });
    } catch (e) {
      req.flash('error', e.message);
      res.redirect('/signup');
    }
  }

  module.exports.getloginRoute = (req , res) => {
    res.render("users/login");
}

module.exports.postloginRoute = async(req,res) => {
    // res.send("welcome to wanderlust you are logged in!!!")
    req.flash("success" , "Yor are Logged In!!!");
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);

}

module.exports.logoutRoute =  (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are logged out successfully!!!");
        res.redirect("/listings");
    });
}