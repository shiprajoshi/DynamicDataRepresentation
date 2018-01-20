var mongoose=require("mongoose");
var Schema = mongoose.Schema;
var chartSchema = new Schema({
  year:{
    type:String,
    required: true,
    unique: true
  },
  population: {
    type:String,
    required: true
  }
});

module.exports = mongoose.model('chart',chartSchema);
