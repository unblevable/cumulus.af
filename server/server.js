// Module dependencies.
var application_root    = __dirname,
    express             = require('express'),
    path                = require('path'),
    mongoose            = require('mongoose'),
    _                   = require('underscore');
    dropbox             = require('dropbox.js');

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




//Start server
var port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log('Express server listening on port %d in %s mode', port, app.settings.env);
    var accountCall = function( account ) {
        console.log(account);
    }
    account = dropbox(accountCall);
});

//
// GET ROUTES
// 
app.get('/api', function(req, res) {
    response.send('API is running');
});

// USERS
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
