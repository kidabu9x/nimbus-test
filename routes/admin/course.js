const express = require('express');
const router = express.Router();

// Course Model
const Course = require('../../models/Course');
const Class = require('../../models/Class');
const Lession = require('../../models/Lession');
// Test Result Model

// @route   GET api/admin/course
// @desc    Get All Courses
// @access  Public
router.get('/', (req, res) => {
    Course.find(req.query)
        .then(courses => res.json(courses));
});

// @route   GET api/admin/course/handle
// @desc    Get one Course by it's handle
// @access  Public
router.get('/:handle', (req, res) => {
    Course.findOne({
        handle : req.params.handle
    })
        .then(course => res.json(course));
});

// @route   GET api/admin/course/fetch-lessions
// @desc    Get all lessions of courses
// @access  Public
// router.get('/fetch-lessions', (req, res) => {
//     Class.find(req.query)
//         .then(classes => {
//             let lessions = [];
//             for (let i = 0; i < classes.length; i++) {
//                 Lession.find({
//                     class_id : classes[i]._id
//                 })
//                  .then(data => {
//                     lessions = lessions.concat(data);
//                     if (i == classes.length - 1) {
//                         res.json(lessions);
//                     }
//                  });
//             }
//         });
// });

// @route   Post api/admin/course
// @desc    Create new course
// @access  Public
router.post('/', (req, res) => {
    let newCourse = new Course({
        name                        : req.body.name,
        description                 : req.body.description,
        is_recruit                  : req.body.is_recruit,
        enable_create_private_class : req.body.enable_create_private_class,
        maximum_private_class       : req.body.maximum_private_class
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

// @route   Put api/admin/course
// @desc    Update a course
// @access  Public
router.put('/', (req, res) => {
    Course.findById(req.body._id)
        .then(course => {
            course.description                  = req.body.description;
            course.is_recruit                   = req.body.is_recruit;
            course.enable_create_private_class  = req.body.enable_create_private_class;
            course.maximum_private_class        = req.body.maximum_private_class;
            course.save()
                .then(doc => res.status(200).json(doc));
        })
    
});

module.exports = router;