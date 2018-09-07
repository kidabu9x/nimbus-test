const express = require('express');
const router = express.Router();

// Course Model
const Course = require('../../../models/Course/Course');
const Grade = require('../../../models/Course/Grade');
// Test Result Model

// ----------------------------------API for admin----------------------------
// @route   GET api/grade/admin
// @desc    Get All Grades of course
// @access  Public
router.get('/admin/:courseId', (req, res) => {
    Grade.find({
        course_id: req.params.courseId
    })
        .then(grades => res.json(grades));
});

// @route   GET api/grade/admin
// @desc    Count Grade of course
// @access  Public
router.get('/admin/:courseId/count', (req, res) => {
    Grade.countDocuments({
        course_id: req.params.courseId
    })
        .then(count => res.json(count));
});

// @route   Post api/grade/admin
// @desc    Create new grade
// @access  Public
router.post('/admin', (req, res) => {
    let grade = req.body;
    let newGrade = new Grade({
        name            : grade.name,
        main_teacher_id : grade.main_teacher_id,
        school_days     : grade.school_days,
        school_address  : grade.school_address,
        course_id       : grade.course_id
    });
    newGrade.save()
        .then(grade => res.status(200).json(grade))
        .catch(err => res.status(404).json(null));
});

module.exports = router;