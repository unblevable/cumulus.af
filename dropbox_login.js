function dropboxAuthenticate () {
    var dbox = require('dbox'),
        phantom = require('phantom');

    var APP_KEY = 'ht7wkxiaq9t3lm8',
        APP_SECRET = '0pwb5sy2aveu7sc';

    var app = dbox.app({
        'app_key': APP_KEY,
        'app_secret': APP_SECRET
    });

    app.requesttoken(function (status, requestToken) {
        console.log(requestToken);
        phantom.create(function (ph) {
            ph.createPage(function (page) {
                page.open(requestToken.authorize_url, function (status) {
                    console.log(status);
                    page.includeJs('http://code.jquery.com/jquery-1.10.1.min.js', function () {
                        page.evaluate((function () {
                            // document.getElementById('login_email').value = 'notchdastheny@maildrop.cc';
                            document.getElementById('login_email').value = 'temp6969@yahoo.com';
                            document.getElementById('login_password').value = 'temp69691';
                            // document.getElementsByName('login_submit_dummy')[0].click();
                            document.getElementById('login_submit').click();
                        }), function (result) {
                            setTimeout(function() {
                                page.render('dropbox.png');
                                ph.exit();
                            }, 2000);
                        });
                    });
                });
            });
        });
    });

    function login () {
    }

    function logout () {
    }
}

// module.exports = dropboxAuthenticate;

dropboxAuthenticate();
