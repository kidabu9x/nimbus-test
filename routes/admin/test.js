const express = require('express');
const router = express.Router();
const shortId = require('shortid')

// Test Model
const Test = require('../../models/Test');

// ----------------------------------API for admin----------------------------
// @route   GET api/admin/tests
// @desc    Get All Tests
// @access  Public
router.get('/', (req, res) => {
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

// @route   GET api/admin/tests
// @desc    Get All Tests
// @access  Public
router.get('/:handle', (req, res) => {
    Test.findOne({ handle : req.params.handle})
        .then(test => res.json(test));
});

// @route   POST  api/admin/tests
// @desc    Create A Test
// @access  Public
router.post('/', (req, res) => {
  const newTest = new Test({
    handle              : shortId.generate(),
    teacher_id          : req.body.teacher_id,
    name                : req.body.name,
    time                : req.body.time,
    number_of_students  : req.body.number_of_students,
  });
  newTest.save().then(test => res.json(test));
});

// @route   UPDATE  api/admin/tests
// @desc    Update A Test
// @access  Public
router.put('/:key', (req, res) => {
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

// @route   UPDATE  api/admin/tests
// @desc    Update A Test
// @access  Public
router.delete('/:id', (req, res) => {
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

module.exports = router;