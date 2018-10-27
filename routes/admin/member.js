const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = require('../../config.json').secret;

// Question Model
const Member = require('../../models/Member');

// @route   GET api/admin/member
// @accept  query: member_id
// @desc    Get members
// @access  Public
router.get('/', (req, res) => {
    if (req.query.member_id) {
        Member.findById(req.query.member_id)
            .then(member => res.json(member));
    } else {
        Member.find({
            role: {
                $ne: 'student'
            }
        })
            .then(members => res.json(members));
    }
});

// @route   GET api/admin/member/teachers
// @desc    Get teacher
// @access  Public
router.get('/teachers', (req, res) => {
    Member.find({
        role : {
            $in: ['general_manager', 'teacher']
        }
    })
        .then(members => res.json(members));
});

// @route   POST api/admin/member
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

// @route   UPDATE api/admin/member
// @desc    Update A Member
// @access  Public
router.put('/:id', (req, res) => {
    Member.findById(req.params.id)
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

// @route   DELETE api/admin/member/:id
// @desc    Delete A Member
// @access  Public
router.delete('/:id', (req, res) => {
    Member.findById(req.params.id)
    .then(member => member.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

// @route   GET api/admin/member/check-member?email=memberEmail
// @desc    Check A Member Exist
// @access  Public
router.get('/check-admin', (req, res) => {
    Member.findOne({
        email : req.query.email,
        role : {
            $nin: ['student']
        }
    })
    .then(member => {
        if (member) {
            res.json({ 
                is_match: true,
                member : {
                    first_name  : member.first_name,
                    last_name   : member.last_name,
                    avatar_url  : member.avatar_url
                } 
            });
        } else {
            res.json({ is_match: false });
        }
    })
    .catch(err => res.json({ is_match: false }));
});

// @route   GET api/admin/member/check-member?email=memberEmail
// @desc    Check A Member Exist
// @access  Public
router.get('/check-member', (req, res) => {
    Member.findOne({
        email : req.query.email
    })
    .then(member => {
        if (member) {
            res.json({ 
                is_match: true,
                member : member
            });
        } else {
            res.json({ is_match: false });
        }
    })
    .catch(err => res.json({ is_match: false }));
});

// @route   GET api/admin/member/auth
// @desc    Post Login
// @access  Public
router.post('/auth', (req, res) => {
    Member.findOne({
        email: (req.body.email).toLowerCase(),
        password: req.body.password,
        role : {
            $nin: ['student']
        }
    })
        .then(member => {
            if (member) {
                let token = jwt.sign({ id: member._id }, secret, {expiresIn: 86400});
                res.status(200).send({ auth: true, token: token, member: member })
            } else {
                res.json({auth : false});
            }
        });
});


module.exports = router;