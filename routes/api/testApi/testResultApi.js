const express = require('express');
const router = express.Router();

// Test Result Model
const TestResult = require('../../../models/TestResult');

// ----------------------------------API for admin----------------------------

// @route   GET api/test-result/admin
// @desc    Get All Test Results
// @access  Public
router.get('/admin/:code', (req, res) => {
    TestResult.find({ test_code : req.params.code})
        .then(testResult => res.json(testResult));
});

// @route   POST  api/test-result
// @desc    Create A Test Result
// @access  Public
router.post('/', (req, res) => {
  const newTestResult = new TestResult({
    test_code           : req.body.test_code,
    username            : req.body.username,
    module              : req.body.module,
    total_corrects      : req.body.total_corrects,
    total_questions     : req.body.total_questions,
    score               : Math.floor(req.body.total_corrects*(1000/req.body.total_questions))
  });
  newTestResult.save();
});


// ----------------------------------End API for user----------------------------


module.exports = router;