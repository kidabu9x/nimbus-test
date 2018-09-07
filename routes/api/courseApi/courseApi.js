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
    Course.find()
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
        name: req.body.name,
        img_url: req.body.img_url,
        original_price : req.body.original_price,
        discount_anchors : req.body.discount_anchors ? req.body.discount_anchors : []
    });
    newCourse.save()
        .then(course => res.status(200).json(course))
        .catch(err => res.status(404).json(null));
});




module.exports = router;