function DropboxAuthentication () {
    var dbox = require('dbox'),
        phantom = require('phantom'),
        eventEmitter = require('eventemitter2').EventEmitter2;

    var APP_KEY = 'ht7wkxiaq9t3lm8',
        APP_SECRET = '0pwb5sy2aveu7sc';

    var app = dbox.app({
        'app_key': APP_KEY,
        'app_secret': APP_SECRET
    }),
        emitter = new eventEmitter();

    function login (email, password, callback) {
        app.requesttoken(function (status, requestToken) {
            // add event listener
            emitter.on('render', callback(requestToken));

            console.log(requestToken);
            console.log(status);
            phantom.create(function (ph) {
                ph.createPage(function (page) {
                    page.open(requestToken.authorize_url, function (status) {
                        page.includeJs('http://code.jquery.com/jquery-1.10.1.min.js', function () {
                            page.includeJs('//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min.js', function () {
                                page.evaluate((function (email, password, emitter, requestToken, callback) {
                                    document.getElementById('login_email').value = email;
                                    document.getElementById('login_password').value = password;
                                    document.getElementById('login_submit').click();
                                }), function (result) {
                                    emitter.emit('render', requestToken);
                                    setTimeout(function () {
                                        ph.exit();
                                    }, 1000);
                                }, email, password, emitter, requestToken, callback);
                            });
                        });
                    });
                });
            });
        });
    }

    function logout () {
    }

    function run (callback) {
        var email = 'temp6969@yahoo.com',
            password = 'temp69691';

        login(email, password, callback);

    }

    return run;
}

module.exports = DropboxAuthentication;
