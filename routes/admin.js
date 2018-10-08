const express = require('express');
const router = express.Router();

const question = require('./admin/question');
router.use('/questions', question);

// const test = require('./admin/testApi/testApi');
// router.use('/test', test);

// const schedule = require('./admin/scheduleApi');
// router.use('/schedule', schedule);

// const testResult = require('./admin/testApi/testResultApi');
// router.use('/test-result', testResult);

// const member = require('./admin/memberApi');
// router.use('/member', member);

// const course = require('./admin/courseApi/courseApi');
// router.use('/course', course);

// const subject = require('./admin/courseApi/subjectApi');
// router.use('/subject', subject);

// const classes = require('./admin/courseApi/classApi');
// router.use('/class', classes);

// const lession = require('./admin/courseApi/lessionApi');
// router.use('/lession', lession);

module.exports = router;