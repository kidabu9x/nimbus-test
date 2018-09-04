const express = require('express');
const router = express.Router();

// Course Model
const Course = require('../../../models/Course/Course');
const Grade = require('../../../models/Course/Grade');
// Test Result Model

// ----------------------------------API for admin----------------------------
// @route   GET api/course/admin
// @desc    Get All Courses
// @access  Public
router.get('/admin', (req, res) => {
    Grade.find({
        course_id: req.query.course_id
    })
        .then(grades => res.json(grades));
});

// @route   Post api/course/admin
// @desc    Create new course
// @access  Public
router.post('/admin', (req, res) => {
    let newGrade = new Grade({
        name            : req.body.name,
        main_teacher_id : req.body.main_teacher_id,
        start_date      : req.body.start_date,
        end_date        : req.body.end_date
    });
    newGrade.save()
        .then(grade => res.status(200).json(grade))
        .catch(err => res.status(404).json(null));
});

module.exports = router;