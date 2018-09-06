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
router.get('/admin/:courseID', (req, res) => {
    Grade.find({
        course_id: req.params.courseID
    })
        .then(grades => res.json(grades));
});

// @route   Post api/course/admin
// @desc    Create new course
// @access  Public
router.post('/admin', (req, res) => {
    let grade = req.body.newGrade;
    let newGrade = new Grade({
        name            : grade.name,
        main_teacher_id : grade.main_teacher_id,
        school_days     : grade.school_days,
        school_address  : grade.school_address,
    });
    newGrade.save()
        .then(grade => res.status(200).json(grade))
        .catch(err => res.status(404).json(null));
});

module.exports = router;