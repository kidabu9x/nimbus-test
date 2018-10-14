const express = require('express');
const router = express.Router();

// Course Model
const Lession = require('../../models/Lession');
// Test Result Model

// ----------------------------------API for admin----------------------------
// @route   GET api/admin/lessions
// @desc    Get All Lessions of a grade
// @access  Public
router.get('/', (req, res) => {
    Lession.find(req.query)
        .sort({
            'start_hour' : 1
        })
        .then(lessions => res.json(lessions));
});

// @route   Post api/admin/lessions
// @desc    Create new course
// @access  Public
router.post('/', (req, res) => {
    let newLession = new Lession(req.body);
    newLession.save()
        .then(lession => res.status(200).json(lession))
        .catch(err => res.status(404).json(null));
});

// @route   Put api/admin/lessions/:id
// @desc    Update a lession
// @access  Public
router.put('/:id', (req, res) => {
    Lession.findById(req.params.id)
        .then(lession => {
            lession.teacher_id = req.body.teacher_id;
            lession.school_date = req.body.start_hour;
            lession.room_id = req.body.room_id;
            lession.start_hour = req.body.start_hour;
            lession.end_hour = req.body.end_hour;
            lession.save(doc => res.json(doc));
        });
});

// @route   Delete api/admin/lessions/:id
// @desc    Delete a lession
// @access  Public
router.delete('/:id', (req, res) => {
    Lession.remove(req.params.id)
        .then(lession => {
            res.json(lession);
        });
});

module.exports = router;