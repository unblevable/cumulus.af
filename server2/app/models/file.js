var mongoose = require('mongoose');
FileSchema = mongoose.Schema({
    name: String,
    size: Number,
    url: String
});
var File = mongoose.model("File", FileSchema);
module.exports = File;
