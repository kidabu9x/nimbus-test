const express = require('express');
const router = express.Router();

// Course Model
const Class = require('../../models/Class');
const Lession = require('../../models/Lession');
const Enrollment = require('../../models/Enrollment');
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
            if (!doc.main_teacher_id || (doc.main_teacher_id != req.body.main_teacher_id) || !doc.room_id || (doc.main_teacher_id != req.body.main_teacher_id)) {
                doc.main_teacher_id = req.body.main_teacher_id;
                doc.main_room_id = req.body.main_room_id;
                Lession.find({
                    class_id : req.body._id
                }).then(lessions => {
                    lessions.forEach(lession => {
                        lession.teacher_id = req.body.main_teacher_id;
                        lession.room_id = req.body.main_room_id;
                        lession.save();
                    });
                });
            }
            doc.save()
                .then(e => res.status(200).json(e));
        })
});

// @route   Delete api/admin/class/:id
// @desc    delete a class and all relevant lession
// @access  Public
router.delete('/:id', (req, res) => {
    Class.remove({
        _id: req.params.id
    })
        .then(_ => {
            Lession.remove({
                class_id: req.params.id
            })
                .then(_ => {
                    Enrollment.remove({
                        class_id: req.params.id
                    })
                        .then(_ => {
        
                            res.status(200).json({
                                success: true
                            });
                        });
                });
        });
    
});

module.exports = router;