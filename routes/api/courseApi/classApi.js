const express = require('express');
const router = express.Router();
const shortId = require('shortid');

// Course Model
const Course = require('../../../models/Course/Course');
const Class = require('../../../models/Course/Class');
// Test Result Model

// ----------------------------------API for admin----------------------------
// @route   GET api/class/admin/fetch-all/:courseId
// @desc    Get All Grades of course
// @access  Public
router.get('/admin', (req, res) => {
    Class.find(req.query)
        .then(grades => res.json(grades));
});

// @route   GET api/class/admin
// @desc    Count Grade of course
// @access  Public
router.get('/admin/:courseId/count', (req, res) => {
    Grade.countDocuments({
        course_id: req.params.courseId
    })
        .then(count => res.json(count));
});

// @route   GET api/grade/class/fetch-one/:gradeId
// @desc    Count Grade of course
// @access  Public
router.get('/admin/fetch-one/:gradeHandle', (req, res) => {
    Grade.findOne({
        handle: req.params.gradeHandle
    })
        .then(grade => res.json(grade));
});

// @route   Post api/class/admin
// @desc    Create new class
// @access  Public
router.post('/admin', (req, res) => {
    let newClass = new Class(req.body);
    newClass.save()
        .then(doc => res.status(200).json(doc))
        .catch(err => res.status(404).json(null));
});

// @route   Put api/class/admin
// @desc    update a class
// @access  Public
router.put('/admin', (req, res) => {
    Class.findById(req.body._id)
        .then(doc => {
            doc.is_recruit = req.body.is_recruit;
            doc.save()
                .then(e => res.status(200).json(e));
        })
});

module.exports = router;