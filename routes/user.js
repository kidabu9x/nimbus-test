const express = require('express');
const router = express.Router();

const question = require('./user/question');
router.use('/questions', question);

const member = require('./user/member');
router.use('/member', member);

const test = require('./user/test');
router.use('/test', test);

module.exports = router;