const express = require('express');
const router = express.Router();

// Test Result Model
const TestResult = require('../../models/TestResult');

// ----------------------------------API for admin----------------------------

// @route   POST  api/test-results
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