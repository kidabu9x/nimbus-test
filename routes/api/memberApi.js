const express = require('express');
const router = express.Router();

// Question Model
const Member = require('../../models/Member');

// @route   GET api/member/admin
// @desc    Get members
// @access  Public
router.get('/admin', (req, res) => {
    Member.find()
        .then(members => res.json(members));
});

// @route   GET api/member/admin/teachers
// @desc    Get teacher
// @access  Public
router.get('/admin/teachers', (req, res) => {
    Member.find({
        role : {
            $in: ['general_manager', 'teacher']
        }
    })
        .then(members => res.json(members));
});

// @route   POST api/member/admin
// @desc    Create new Member
// @access  Public
router.post('/admin', (req, res) => {
  const newMember = new Member({
    email           : req.body.email,
    password        : req.body.password,
    first_name      : req.body.first_name,
    last_name       : req.body.last_name
  });
  newMember.save().then(member => res.json(member));
});

// @route   UPDATE api/member/admin
// @desc    Update A Member
// @access  Public
router.put('/admin', (req, res) => {
    Member.findById(req.body._id)
    .then(member => {
        member.username        = req.body.username,
        member.email           = req.body.email,
        member.password        = req.body.password ? req.body.password : 'nimbus123',
        member.phone           = req.body.phone,
        member.identity        = req.body.identity,
        member.first_name      = req.body.first_name,
        member.last_name       = req.body.last_name,
        member.date_of_birth   = req.body.date_of_birth,
        member.address         = req.body.address,
        member.university      = req.body.university,
        member.role            = req.body.role,
        member.facebook_url    = req.body.facebook_url,
        member.avatar_url      = req.body.avatar_url,
        member.alias           = req.body.alias,
        member.gender          = req.body.gender,
        member.extra_info      = req.body.extra_info
      member.save()
        .then(() => res.json({success: true}))
        .catch(err => {
            res.json({success: false})
        })
    })
    .catch(err => res.status(404).json({ success: false }));
});

// @route   DELETE api/member/admin/:id
// @desc    Delete A Member
// @access  Public
router.delete('/admin/:id', (req, res) => {
    Member.findById(req.params.id)
    .then(member => member.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

// @route   GET api/member/admin/check-member?email=memberEmail
// @desc    Check A Member Exist
// @access  Public
router.get('/admin/check-member', (req, res) => {
    Member.findOne({
        email : req.query.email
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