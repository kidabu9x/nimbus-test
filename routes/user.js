const express = require('express');
const router = express.Router();

const question = require('./user/question');
router.use('/questions', question);

const member = require('./user/member');
router.use('/members', member);

const test = require('./user/test');
router.use('/test', test);

const testResult = require('./user/testResult');
router.use('/test-results', testResult);

const enrollment = require('./user/enrollment');
router.use('/enrollments', enrollment);

module.exports = router;