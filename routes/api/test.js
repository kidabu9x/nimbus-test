const express = require('express');
const router = express.Router();

// Question Model
const Question = require('../../models/Question');

// @route   GET api/items
// @desc    Get All Questions
// @access  Public
router.get('/', (req, res) => {
  Question.find(
      {
        module: 1,
        definitely_appear: true
      }
    )
    .then(questions => res.json(questions));
});

// @route   POST api/items
// @desc    Create A Question
// @access  Public
router.post('/', (req, res) => {
  const newQuest = new Question({
    module      : req.body.module,
    type        : req.body.type,
    form        : req.body.form,
    content     : req.body.content,
    image       : req.body.image,
    answers     : req.body.answers,
    description : req.body.description,
    definitely_appear: req.body.definitely_appear
  });
  newQuest.save().then(question => res.json(question));
});

// @route   UPDATE api/items
// @desc    Update A Question
// @access  Public
router.put('/:id', (req, res) => {
  Question.findById(req.params.id)
    .then(question => {
      question.module      = req.body.module,
      question.type        = req.body.type,
      question.form        = req.body.form,
      question.content     = req.body.content,
      question.image       = req.body.image,
      question.answers     = req.body.answers,
      question.description = req.body.description,
      question.definitely_appear = req.body.definitely_appear
      question.save()
        .then(() => res.json({success: true}))
        .catch(err => res.json({success: false}))
    })
    .catch(err => res.status(404).json({ success: false }));
});

// @route   DELETE api/items/:id
// @desc    Delete A Question
// @access  Public
router.delete('/:id', (req, res) => {
  Question.findById(req.params.id)
    .then(question => question.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;