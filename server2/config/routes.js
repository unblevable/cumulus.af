var User = require('../app/models/user');
var File = require('../app/models/file');
var Account = require('../app/models/account');
var Auth = require('./middlewares/authorization.js');

module.exports = function(app, passport){
    app.get("/", function(req, res){ 
        if(req.isAuthenticated()){
          res.render("home", { user : req.user}); 
        }else{
            res.render("home", { user : null});
        }
    });

    app.get("/login", function(req, res){ 
        res.render("login");
    });

    app.post("/login" 
        ,passport.authenticate('local',{
            successRedirect : "/",
            failureRedirect : "/login",
        })
    );

    app.get("/signup", function (req, res) {
        res.render("signup");
    });

    app.post("/signup", Auth.userExist, function (req, res, next) {
        User.signup(req.body.email, req.body.password, function(err, user){
            if(err) throw err;
            req.login(user, function(err){
                if(err) return next(err);
                return res.redirect("profile");
            });
        });
    });


    app.get("/profile", Auth.isAuthenticated , function(req, res){ 
        res.render("profile", { user : req.user});
    
        console.log(req.user);
    });

    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/login');
    });
}
