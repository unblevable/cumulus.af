// Module dependencies.
var application_root    = __dirname,
    express             = require('express'),
    path                = require('path'),
    mongoose            = require('mongoose'),
    _                   = require('underscore'),
    passport            = require('passport'),
    LocalStrategy       = require('passport-local').Strategy;
    generate_dropbox_account = require('generate_dropbox_account.js');

//Create server
var app = express();

// Configure server
app.configure(function() {
    //parses request body and populates request.body
    app.use(express.bodyParser());

    //checks request.body for HTTP method overrides
    app.use(express.methodOverride());


    //Where to serve static content
    app.use(express.static(path.join(application_root, 'site')));

    //Show all errors in development
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack:      true
    }));

    app.use(express.cookieParser());
    app.use(express.session({ secret: 'SECRET' }));
    app.use(passport.initialize());
    app.use(passport.session());

    //perform route lookup based on url and HTTP method
    app.use(app.router);

});


// Connect to database
mongoose.connect('mongodb://localhost/cumulusUsers', ['list', 'collections']);

/**
 * SCHEMAS
 */

// Schema for a user
var User = new mongoose.Schema({
    email: String,
    password: String,
    createdAt: Number,
    updatedAt: Number,
    accounts: [],
    files: []
});

// Schema for an Account
var Account = new mongoose.Schema({
    email: String,
    password: String,
    service: String,
    totalSpace: Number,
    usedSpace: Number
});

// Schema for a File
var File = new mongoose.Schema({
    name: String,
    size: Number,
    url: String
});

// Instantiate models based on schemas
var User = mongoose.model('User', User);
var Account = mongoose.model('Account', Account);
var File = mongoose.model('File', File);

// configure passport
passport.use(new LocalStrategy(
  function(email, password, done) {
    User.findOne({ email: email }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

var db_function = function (EMAIL){
    console.log('asdf');
}

//Start server
var port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log('Express server listening on port %d in %s mode', port, app.settings.env);
    generate_dropbox_account(db_function);

});


//
// GET ROUTES
//
app.get('/dashboard', function(req, res) {
     {
        if(req.isAuthenticated()) {
            res.send('dashboard!!');
        } else {
            res.send('not authoried');
        }
    }
});

// USERS
app.post('/register', function(req, res) {
    // attach POST to user schema
    var user = new User({ email: req.body.email, password: req.body.password });
    // save in Mongo
    user.save(function(err,user) {
        if(err) {
            console.log(err);
        } else {
            console.log('user: ' + user.email + " saved.");
            req.login(user, function(err) {
                if (!err) {
                    return res.redirect('/dashboard');
                } else {
                    console.log(err);
                }
            });
        }
    });
});

app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

// FILES
app.post('api/file', function(req,res) {

    var filename = req.body.name;
    console.log(filename);
    // check that the file name does not exist

    // find space on an account
        // if no space create new account and grab account info

    // use dropbox/service api to upload a file
    // create a new File for the current User and save the url
});

app.get('api/file/:name', function(req,res) {

    var filename = req.params.name;
    var username = req.body.username;
    var password = req.body.password; //MD5 hash

    Users.findOne({username: username, password: password}, function(err,user) {
       if(!err) {
            console.log(user);
            res.send(user);
        } else {
            console.log(err);
        }
    });

});
