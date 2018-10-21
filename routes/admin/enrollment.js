const express = require('express');
const router = express.Router();

// Course Model
const Enrollment = require('../../models/Enrollment');
// Test Result Model

// ----------------------------------API for admin----------------------------
// @route   GET api/admin/enrollments
// @desc    Get enrollments
// @access  Public
router.get('/', (req, res) => {
    Enrollment.find(req.query)
        .sort({
            'createAt' : 1
        })
        .then(enrolls => res.json(enrolls));
});

// @route   GET api/admin/enrollments
// @desc    Get an enrollments
// @access  Public
router.get('/count', (req, res) => {
    Enrollment.countDocuments(req.query)
        .then(count => res.json(count));
});

// @route   Post api/admin/enrollments
// @desc    Create enrollment
// @access  Public
router.post('/', (req, res) => {
    let Enrollment = new Lession(req.body);
    Enrollment.save()
        .then(enroll => res.status(200).json(enroll))
        .catch(err => res.status(404).json(null));
});

// @route   Put api/admin/enrollments/:id
// @desc    Update a lession
// @access  Public
router.put('/:id', (req, res) => {
    Enrollment.findById(req.params.id)
        .then(enroll => {
            enroll.class_id = req.body.teacher_id;
            enroll.user_id = req.body.start_hour;

            enroll.emailed.status       = req.body.emailed.status;
            enroll.emailed.sender_id    = req.body.emailed.sender_id;
            enroll.emailed.sent_at      = req.body.emailed.sent_at;
            enroll.emailed.is_confirmed = req.body.emailed.is_confirmed;

            enroll.called.status        = req.body.called.status;
            enroll.called.caller_id     = req.body.called.caller_id;
            enroll.called.called_at     = req.body.called.called_at;
            enroll.called.is_confirmed  = req.body.called.is_confirmed;

            enroll.paid.status          = req.body.paid.status;
            enroll.paid.collector_id    = req.body.paid.collector_id;
            enroll.paid.collected_at    = req.body.paid.collected_at;
            enroll.paid.amount          = req.body.paid.amount;

            enroll.description = req.body.description;
            enroll.note = req.body.note;
            
            enroll.save(doc => res.json(doc));
        });
});

// @route   Delete api/admin/enrollments/:id
// @desc    Delete a lession
// @access  Public
router.delete('/:id', (req, res) => {
    Enrollment.remove(req.params.id)
        .then(lession => {
            res.json(lession);
        });
});

module.exports = router;