const express = require('express');
const router = express.Router();

const Admin = require('./admin');
const User = require('./user');

router.use('/admin', Admin);
router.use('/', User);

module.exports = router;