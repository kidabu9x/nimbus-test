const express = require('express');
const router = express.Router();

const question = require('./admin/question');
router.use('/questions', question);

const test = require('./admin/test');
router.use('/tests', test);

const testResult = require('./admin/testResult');
router.use('/test-results', testResult);

const member = require('./admin/member');
router.use('/members', member);

const course = require('./admin/course');
router.use('/courses', course);

const subject = require('./admin/subject');
router.use('/subjects', subject);

const classes = require('./admin/class');
router.use('/classes', classes);

const lession = require('./admin/lession');
router.use('/lessions', lession);

// const schedule = require('./admin/scheduleApi');
// router.use('/schedule', schedule);



module.exports = router;