var mongoose=require("mongoose");
var Schema = mongoose.Schema;
var chartSchema = new Schema({
  year: String,
  population: String
});

module.exports = mongoose.model('charts',chartSchema);

