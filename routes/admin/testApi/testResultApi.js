const express = require('express');
const router = express.Router();

// Test Result Model
const TestResult = require('../../../models/TestResult');

// ----------------------------------API for admin----------------------------

// @route   GET api/test-result/admin/:code
// @desc    Get All Test Results
// @access  Public
router.get('/admin/:code', (req, res) => {
    TestResult.find({ test_code : req.params.code}, {
      createdAt: 1,
      module: 1,
      total_corrects: 1,
      total_questions: 1,
      member_id: 1,
      score: 1
    })
      .then(testResult => {
        let response = [];
        for (let result of testResult) {
          let index = response.findIndex(e => e.member_id == result.member_id);
          if (index == -1) {
            response.push({
              member_id: result.member_id,
              results: [{
                _id : result._id,
                createdAt: result.createdAt,
                module: result.module,
                total_corrects: result.total_corrects,
                total_questions: result.total_questions,
                score: result.score
              }]
            })
          } else {
            response[index].results.push({
              _id : result._id,
              createdAt: result.createdAt,
              module: result.module,
              total_corrects: result.total_corrects,
              total_questions: result.total_questions,
              score: result.score
            })
          }
        }
        res.json(response);
      });
});

// @route   GET api/test-result/admin/:code:/:id
// @desc    Get a Test Results
// @access  Public
router.get('/admin/:code/:id', (req, res) => {
  TestResult.findById(req.params.id)
    .then(testResult => {
      res.json(testResult);
    });
});

// @route   GET api/test-result/admin
// @desc    Count Test Results of a Key
// @access  Public
router.get('/admin/:code/count', (req, res) => {
  TestResult.countDocuments({ test_code : req.params.code})
    .then(count => res.json(count));
});

// @route   POST  api/test-result
// @desc    Create A Test Result
// @access  Public
router.post('/', (req, res) => {
  const newTestResult = new TestResult({
    test_code           : req.body.test_code,
    member_id           : req.body.member_id,
    module              : req.body.module,
    total_corrects      : req.body.total_corrects,
    total_questions     : req.body.total_questions,
    score               : Math.floor(req.body.total_corrects*(1000/req.body.total_questions)),
    incorrect_answers   : req.body.incorrect_answers
  });
  newTestResult.save();
});


// ----------------------------------End API for user----------------------------


module.exports = router;