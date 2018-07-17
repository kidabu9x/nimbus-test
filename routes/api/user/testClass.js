const express = require('express');
const router = express.Router();

// Question Model
const TestClass = require('../../../models/TestClass');

// @route   GET api/items
// @desc    Get All Questions
// @access  Public
router.get('/:code', (req, res) => {
    TestClass.findOne({
        handle: req.params.code
    }).then(testSettings => {
        if (!testSettings) {
            res.json({error: 'Sai mã code !'});
        }
        else if (!testSettings.active) {
            res.json({error: 'Code chưa được active !'})
        }
        else {
            res.json(testSettings);
        }
    })
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

// @route   UPDATE api/test-class/:code
// @desc    Create new answer from student to results
// @access  Public
router.put('/:code', (req, res) => {
    TestClass.findOne({
        handle: req.params.code
    })
    .then(question => {
      question.results.push(req.body);
      question.save()
        .then(() => res.json({success: true}))
        .catch(err => res.json({success: false}))
    })
    .catch(err => res.status(404).json({ success: false }));
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