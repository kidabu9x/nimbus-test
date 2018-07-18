const express = require('express');
const router = express.Router();
const shortId = require('shortid')

// Question Model
const TestClass = require('../../../models/TestClass');

// @route   GET api/items
// @desc    Get All Questions
// @access  Public
router.get('/', (req, res) => {
    TestClass.find()
        .then(testClasses => res.json(testClasses));
});

// @route   POST api/items
// @desc    Create A Question
// @access  Public
router.post('/', (req, res) => {
  const newTestClass = new TestClass({
    handle              : shortId.generate(),
    teacher_name        : req.body.teacher_name,
    name                : req.body.name,
    module              : req.body.module,
    time                : req.body.time,
    number_of_students  : req.body.number_of_students,
  });
  newTestClass.save().then(testClass => res.json(testClass));
});

// @route   UPDATE api/items
// @desc    Update A Question
// @access  Public
router.put('/:key', (req, res) => {
  TestClass.findOne({
    handle: req.params.key
  })
    .then(test => {
      test.active = !test.active;
      let msg = test.active ? `Active '${test.name}' success !!!` : `Deactive '${test.name}' success !!!`;
      test.save()
        .then(() => res.json({msg: msg}))
        .catch(err => console.log(err))
    })
    .catch(err => res.status(404).json({key : req.params.key}));
});

// @route   DELETE api/items/:id
// @desc    Delete A Question
// @access  Public
// router.delete('/:id', (req, res) => {
//   Question.findById(req.params.id)
//     .then(question => question.remove().then(() => res.json({ success: true })))
//     .catch(err => res.status(404).json({ success: false }));
// });

module.exports = router;