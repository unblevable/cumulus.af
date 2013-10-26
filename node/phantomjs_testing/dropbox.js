function generateDropboxAccount() {
    var maildropPage = new WebPage(),
        dropboxPage = new WebPage(),
        system = require('system'),
        dropboxAddress = "http://dropbox.com",
        maildropAddress = "http://maildrop.cc",
        hasChangedUrl = 0,
        EMAIL,
        PASSWORD = 'dummy_password';

    // Query maildrop and pull in new email address
    maildropPage.open(maildropAddress, function(status) {
        if (status == 'success') {
            maildropPage.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js", function() {
                EMAIL = maildropPage.evaluate(function () {
                    return $('#suggestion a').html();
                });
            });
        }
    });
    maildropPage.onLoadFinished = function(status) {
        // Register new account on Dropbox
        dropboxPage.open(dropboxAddress, function(status) {
            if(status == 'success') {
                dropboxPage.evaluate(function(EMAIL, PASSWORD) {
                    
                    document.getElementById("fname").value = "dummy_fname";
                    document.getElementById("lname").value = "dummy_lname";
                    document.getElementById("email").value = EMAIL;
                    document.getElementById("password").value = PASSWORD;
                    document.getElementById("tos_agree").checked = true;
                    document.getElementById("signup-form").submit();

                }, EMAIL, PASSWORD);
            }
        });
        dropboxPage.onUrlChanged = function(targetUrl) {
            hasChangedUrl++;
        };
        dropboxPage.onLoadFinished = function(status) {
            if (hasChangedUrl >= 2){ 
                phantom.exit();
            }
        };
    }
    return {'email': EMAIL,
            'password': PASSWORD}
}

module.exports = generateDropboxAccount;
