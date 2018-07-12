var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  module: {
    type: Number
  },
  type: {
    type: String,
    default: 'theory'
  },
  form: {
    type: Number,
    default: 1
  },
  content: {
    type: String
  },
  image: {
    type: String,
    default: null
  },
  answers: {
    type: Array,
    default: []
  },
  description: {
    type: String,
    default: null
  },
  definitely_appear: {
    type: Boolean,
    default: false
  }
});

var question = mongoose.model("Question", QuestionSchema);
module.exports = question;