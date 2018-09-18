const express = require('express');
const router = express.Router();
const shortId = require('shortid')

// Test Model
const Test = require('../../../models/TestClass');
// Test Result Model
const TestResult = require('../../../models/TestResult');

// ----------------------------------API for admin----------------------------
// @route   GET api/test/admin
// @desc    Get All Tests
// @access  Public
router.get('/admin', (req, res) => {
    Test.aggregate([
        {
            $project: {
                _id                 : 1,
                handle              : 1,
                teacher_name        : 1,
                teacher_id          : 1,
                name                : 1,
                createdAt           : 1
            }
        },
        {$sort: {createdAt: 1}}
    ])
        .then(tests => res.json(tests));
});

// @route   GET api/test/admin
// @desc    Get All Tests
// @access  Public
router.get('/admin/:handle', (req, res) => {
    Test.findOne({ handle : req.params.handle})
        .then(test => res.json(test));
});

// @route   POST  api/test/admin
// @desc    Create A Test
// @access  Public
router.post('/admin', (req, res) => {
    console.log(req.body);
  const newTest = new Test({
    handle              : shortId.generate(),
    teacher_id          : req.body.teacher_id,
    name                : req.body.name,
    time                : req.body.time,
    number_of_students  : req.body.number_of_students,
  });
  newTest.save().then(test => res.json(test));
});

// @route   UPDATE  api/test/admin
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

// @route   UPDATE  api/test/admin
// @desc    Update A Test
// @access  Public
router.delete('/admin/:id', (req, res) => {
    console.log(req.params.id);
    Test.findOneAndDelete({
        _id: req.params.id
    })
        .then(test => {
            console.log(test);
            res.status(200).json(true)
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
            res.json({error: 'Sai mã code'});
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
// @desc    Create A Test
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


// ----------------------------------End API for user----------------------------


module.exports = router;