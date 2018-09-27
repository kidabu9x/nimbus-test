const express = require('express');
const router = express.Router();

// Course Model
const Lession = require('../../../models/Course/Lession');
// Test Result Model

// ----------------------------------API for admin----------------------------
// @route   GET api/lession/admin
// @desc    Get All Lessions of a grade
// @access  Public
router.get('/admin', (req, res) => {
    Lession.find(req.query)
        .sort({
            'start_hour' : 1
        })
        .then(lessions => res.json(lessions));
});

// @route   Post api/lession/admin
// @desc    Create new course
// @access  Public
router.post('/admin', (req, res) => {
    let newLession = new Lession(req.body);
    newLession.save()
        .then(lession => res.status(200).json(lession))
        .catch(err => res.status(404).json(null));
});

module.exports = router;