var page = new WebPage(),
    system = require('system'),
    address;

var hasChangedUrl = 0;

if(system.args.length < 4) {
    phantom.exit();
} else {
    address = system.args[1];
    var EMAIL = system.args[2];
    var PASSWORD = system.args[3];
    page.open(address,function(status) {
        if(status == 'success') {
            page.evaluate(function(EMAIL, PASSWORD) {
                
                document.getElementById("fname").value = "hello";
                document.getElementById("lname").value = "hello";
                document.getElementById("email").value = EMAIL;
                document.getElementById("password").value = PASSWORD;
                document.getElementById("tos_agree").checked = true;
                document.getElementById("signup-form").submit();

            }, EMAIL, PASSWORD);
        }
    });
    page.onUrlChanged = function(targetUrl) {
        hasChangedUrl++;
    };
    page.onLoadFinished = function(status) {
        if (hasChangedUrl >= 2){ 
            phantom.exit();
        }
    };
}