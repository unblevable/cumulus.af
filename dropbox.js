var page = new WebPage(),
    system = require('system'),
    address;

if(system.args.length < 4) {
    phantom.exit();
} else {
    address = system.args[1];
    var NAME = system.args[2];
    var PASSWORD = system.args[3];
    page.open(address,function(status) {
        if(status == 'success') {
            page.evaluate(function () {
                
                document.getElementById("fname").value = "hello";
                document.getElementById("lname").value = "hello";
                document.getElementById("email").value = NAME + "@gmail.com";
                document.getElementById("password").value = PASSWORD;
                document.getElementById("tos_agree").checked = true;
                document.getElementById("signup-form").submit();

            });
            console.log('done!');
            setTimeout(function(){phantom.exit()},5000);
        }
    });
}
