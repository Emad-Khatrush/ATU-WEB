  
var middlewareObject = {};

middlewareObject.isLogin = (req, res, next)=>{
  if(req.isAuthenticated())
  {
    return next();
  }
  req.flash("error","Lütfen giriş yapınız");
  res.redirect("/login");
}

middlewareObject.isEmpty = (obj)=>{
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

module.exports = middlewareObject;