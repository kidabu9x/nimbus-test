const express = require('express');
const router = express.Router();

// Course Model
const Class = require('../../models/Class');
// Test Result Model

// @route   GET api/admin/class/fetch-all/:courseId
// @desc    Get All Grades of course
// @access  Public
router.get('/', (req, res) => {
    Class.find(req.query)
        .then(grades => res.json(grades));
});

// @route   GET api/admin/class
// @desc    Count Grade of course
// @access  Public
router.get('/:courseId/count', (req, res) => {
    Grade.countDocuments({
        course_id: req.params.courseId
    })
        .then(count => res.json(count));
});

// @route   GET api/grade/class/fetch-one/:gradeId
// @desc    Count Grade of course
// @access  Public
router.get('/fetch-one/:gradeHandle', (req, res) => {
    Grade.findOne({
        handle: req.params.gradeHandle
    })
        .then(grade => res.json(grade));
});

// @route   Post api/admin/class
// @desc    Create new class
// @access  Public
router.post('/', (req, res) => {
    let newClass = new Class(req.body);
    newClass.save()
        .then(doc => res.status(200).json(doc))
        .catch(err => res.status(404).json(null));
});

// @route   Put api/admin/class
// @desc    update a class
// @access  Public
router.put('/', (req, res) => {
    Class.findById(req.body._id)
        .then(doc => {
            doc.is_recruit = req.body.is_recruit;
            doc.save()
                .then(e => res.status(200).json(e));
        })
});

module.exports = router;