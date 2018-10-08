const express = require('express');
const router = express.Router();

// Course Model
const Subject = require('../../../models/Course/Subject');
// Test Result Model

// ----------------------------------API for admin----------------------------
// @route   GET api/subject/admin
// @desc    Get All Courses
// @access  Public
router.get('/admin', (req, res) => {
    Subject.find()
        .then(subjects => res.json(subjects));
});

// @route   GET api/course/admin/handle
// @desc    Get one Course by it's handle
// @access  Public
router.get('/admin/:handle', (req, res) => {
    Course.findOne({
        handle : req.params.handle
    })
        .then(course => res.json(course));
});

// @route   Post api/course/admin
// @desc    Create new course
// @access  Public
router.post('/admin', (req, res) => {
    let newCourse = new Subject({
        name: req.body.name,
        original_price : req.body.original_price,
    });
    newCourse.save()
        .then(course => res.status(200).json(course))
        .catch(err => res.status(404).json(null));
});


module.exports = router;