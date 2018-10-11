const express = require('express');
const router = express.Router();

// Question Model
const Member = require('../../models/Member');

// @route   GET api/members/check-member?email=memberEmail
// @desc    Check A Member Exist
// @access  Public
router.get('/check-member', (req, res) => {
    Member.findOne({
        email : (req.query.email).toLowerCase().trim()
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

// @route   POST api/members
// @desc    Create new Member
// @access  Public
router.post('/', (req, res) => {
    const newMember = new Member({
      email           : req.body.email,
      password        : req.body.password ? req.body.password : 'nimbus123',
      first_name      : req.body.first_name,
      last_name       : req.body.last_name
    });
    newMember.save().then(member => res.json(member));
  });

module.exports = router;