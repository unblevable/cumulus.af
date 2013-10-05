// Module dependencies.
var application_root    = __dirname,
    express             = require('express'),
    path                = require('path'),
    mongoose            = require('mongoose'),
    _                   = require('underscore'),
    everyauth           = require('everyauth');

//Create server
var app = express();

// Configure server
app.configure(function() {
    //parses request body and populates request.body
    app.use(express.bodyParser());

    //checks request.body for HTTP method overrides
    app.use(express.methodOverride());

    //perform route lookup based on url and HTTP method
    app.use(app.router);

    //Where to serve static content
    app.use(express.static(path.join(application_root, 'site')));

    //Show all errors in development
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack:      true
    }));

    // everyauth
    app.use(express.cookieParser('mr ripley'));
    app.use(express.session());
    app.use(everyauth.middleware(app));

    // jade
    app.set('view engine', 'jade');
    app.set('views', everyauthRoot + '/example/views');
});


// Connect to database
mongoose.connect('mongodb://localhost/cumulusUsers', ['list', 'collections']);

/**
 * SCHEMAS
 */

// Schema for a user
var User = new mongoose.Schema({
    username: String,
    password: String,
    createdAt: Number,
    updatedAt: Number,
    accounts: [Account],
    files: [File]
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
var Users = mongoose.model('User', User);

var usersByLogin = {};
everyauth
  .password
    .loginWith('email')
    .getLoginPath('/login')
    .postLoginPath('/login')
    .loginView('login.jade')
//    .loginLocals({
//      title: 'Login'
//    })
//    .loginLocals(function (req, res) {
//      return {
//        title: 'Login'
//      }
//    })
    .loginLocals( function (req, res, done) {
      setTimeout( function () {
        done(null, {
          title: 'Async login'
        });
      }, 200);
    })
    .authenticate( function (login, password) {
      var errors = [];
      if (!login) errors.push('Missing login');
      if (!password) errors.push('Missing password');
      if (errors.length) return errors;
      var user = usersByLogin[login];
      if (!user) return ['Login failed'];
      if (user.password !== password) return ['Login failed'];
      return user;
    })

    .getRegisterPath('/register')
    .postRegisterPath('/register')
    .registerView('register.jade')
//    .registerLocals({
//      title: 'Register'
//    })
//    .registerLocals(function (req, res) {
//      return {
//        title: 'Sync Register'
//      }
//    })
    .registerLocals( function (req, res, done) {
      setTimeout( function () {
        done(null, {
          title: 'Async Register'
        });
      }, 200);
    })
    .validateRegistration( function (newUserAttrs, errors) {
      var login = newUserAttrs.login;
      if (usersByLogin[login]) errors.push('Login already taken');
      return errors;
    })
    .registerUser( function (newUserAttrs) {
      var login = newUserAttrs[this.loginKey()];
      return usersByLogin[login] = addUser(newUserAttrs);
    })

    .loginSuccessRedirect('/')
    .registerSuccessRedirect('/');

function addUser (source, sourceUser) {
  var user;
  if (arguments.length === 1) { // password-based
    user = sourceUser = source;
    user.id = ++nextUserId;
    return usersById[nextUserId] = user;
  } else { // non-password-based
    user = usersById[++nextUserId] = {id: nextUserId};
    user[source] = sourceUser;
  }
  return user;
}

//Start server
var port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});

//
// GET ROUTES
// 

app.get('/', function (req, res) {
  res.render('home');
});

app.get('/api', function(req, res) {
    response.send('API is running');
});

// USERS
everyauth.everymodule.findUserById( function (req, userId, callback ) {

    // use the request in some way ...
    Users.findById(userId,function(err,user) {
        if(!err) {
            
        }
    }); 

});

app.post('api/user/create', function(req,res) {
    var username = req.body.username;
    var password = req.body.password;

    // check that username is available
        // if not throw error
        // otherwise make account and login

});
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
