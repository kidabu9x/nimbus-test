var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var QuestionSchema = new Schema(
{
  module: {
    type: Number
  },
  type: {
    type: String,
    default: 'theory'
  },
  content: {
    type: String
  },
  answer_type: {
    type: String,
    default: 'multi_choice'
    // Current there are two options: multi_choice and drag_drop
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
  },
  incorrect_times: {
    type: Number,
    default: 0
  },
  called_times: {
    type: Number,
    default: 0
  }
}, 
{
  timestamps: {
    createAt: 'create_at',
    updateAt: 'update_at'
  }
}
);

var question = mongoose.model("Question", QuestionSchema);
module.exports = question;