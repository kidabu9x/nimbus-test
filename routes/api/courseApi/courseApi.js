const express = require('express');
const router = express.Router();
const shortId = require('shortid');

// Course Model
const Course = require('../../../models/Course/Course');
// Test Result Model

// ----------------------------------API for admin----------------------------
// @route   GET api/course/admin
// @desc    Get All Courses
// @access  Public
router.get('/admin', (req, res) => {
    Course.find(req.query)
        .then(courses => res.json(courses));
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
    let newCourse = new Course({
        name                        : req.body.name,
        description                 : req.body.description,
        is_recruit                  : req.body.is_recruit,
        enable_create_private_grade : req.body.enable_create_private_grade,
        maximum_private_grade       : req.body.maximum_private_grade
    });
    newCourse.save()
        .then((err,course) => {
            if (!err) {
                res.status(200).json(course);
            } else {
                res.status(200).json(err);
            }
        })
        .catch(err => res.status(200).json({
            error: true,
            message: 'Tên khóa học không được trùng lặp'
        }));
});


module.exports = router;