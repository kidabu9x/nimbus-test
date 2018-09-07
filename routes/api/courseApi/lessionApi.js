const express = require('express');
const router = express.Router();

// Course Model
const Course = require('../../../models/Course/Course');
const Grade = require('../../../models/Course/Grade');
const Lession = require('../../../models/Course/Lession');
// Test Result Model

// ----------------------------------API for admin----------------------------
// @route   GET api/lession/admin
// @desc    Get All Lessions of a grade
// @access  Public
router.get('/admin/:gradeId', (req, res) => {
    Lession.find({
        grade_id: req.params.gradeId
    })
        .then(lessions => res.json(lessions));
});

// @route   Post api/lession/admin
// @desc    Create new course
// @access  Public
router.post('/admin', (req, res) => {
    let lession = req.body;
    let newLession = new Lession({
        grade_id        : lession.grade_id,
        teacher_id      : lession.teacher_id,
        school_date     : lession.school_date,
        start_hour      : lession.start_hour,
        end_hour        : lession.end_hour,
        handle          : lession.handle
    });
    newLession.save()
        .then(lession => res.status(200).json(lession))
        .catch(err => res.status(404).json(null));
});

module.exports = router;