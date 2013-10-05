var mongoose = require('mongoose');
AccountSchema = mongoose.Schema({
    email: String,
    password: String,
    service: String,
    spaceUsed: Number,
    spaceAvailable: Number
});
var Account = mongoose.model("Account", AccountSchema);
module.exports = Account;
