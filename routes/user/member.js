const express = require('express');
const router = express.Router();

// Question Model
const Member = require('../../models/Member');

// @route   GET api/member/check-member?email=memberEmail
// @desc    Check A Member Exist
// @access  Public
router.get('/check-member', (req, res) => {
    Member.findOne({
        email : (req.query.email).toLowerCase()
    })
    .then(member => {
        if (member) {
            res.json({ is_match: true, member: member });
        } else {
            res.json({ is_match: false });
        }
    })
    .catch(err => res.json({ is_match: false }));
});

module.exports = router;