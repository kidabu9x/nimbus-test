const express = require('express');
const router = express.Router();

const question = require('./user/question');
router.use('/questions', question);

const member = require('./user/member');
router.use('/member', member);

const test = require('./user/test');
router.use('/test', test);

const testResult = require('./user/testResult');
router.use('/test-results', testResult);

module.exports = router;