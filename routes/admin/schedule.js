const express = require('express');
const router = express.Router();

// Test Model
const ExamSchedule = require('../../../models/ExamSchedule');


// ----------------------------------API for admin----------------------------
// @route   GET api/admin/schedules
// @desc    Get All Tests
// @access  Public
router.get('/admin', (req, res) => {
    ExamSchedule.find({})
        .then(schedules => {
            res.json(schedules);
        });
});

// @route   GET api/admin/schedules
// @desc    Get All Tests
// @access  Public
router.get('/admin/:handle', (req, res) => {
    Test.findOne({ handle : req.params.handle})
        .then(test => res.json(test));
});

// @route   POST  api/admin/schedules
// @desc    Create A Test
// @access  Public
router.post('/admin', (req, res) => {
  const newTest = new Test({
    handle              : shortId.generate(),
    teacher_name        : req.body.teacher_name,
    name                : req.body.name,
    module              : req.body.module,
    time                : req.body.time,
    number_of_students  : req.body.number_of_students,
  });
  newTest.save().then(test => res.json(test));
});

// @route   UPDATE  api/admin/schedules
// @desc    Update A Test
// @access  Public
router.put('/admin/:key', (req, res) => {
    Test.findOne({
        handle: req.params.key
    })
        .then(test => {
            let updateField = req.body;
            let field = Object.keys(updateField)[0];
            let value = updateField[Object.keys(updateField)[0]];
            test[field] = value;
            let msg = `Change ${test.name} "${field} = ${value}" success !!!`
            test.save()
                .then(() => res.json({msg: msg}))
                .catch(err => console.log(err))
            })
        .catch(err => res.status(404).json({key : req.params.key}));
});

// ----------------------------------End API for admin----------------------------



// ----------------------------------API for user---------------------------------

// @route   GET api/test
// @desc    Get a test
// @access  Public
router.get('/:code', (req, res) => {
    Test.findOne({
        handle: req.params.code
    }).then(testSettings => {
        if (!testSettings) {
            res.json({error: 'Sai mã code !'});
        }
        else if (!testSettings.active) {
            res.json({error: 'Code chưa được kích hoạt !'})
        }
        else {
            res.json(testSettings);
        }
    })
});

// @route   POST api/test
// @desc    Create A Question
// @access  Public
router.post('/', (req, res) => {
  const newTestClass = new Test({
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
    Test.findOne({
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

// ----------------------------------End API for user----------------------------


module.exports = router;