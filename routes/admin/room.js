const express = require('express');
const router = express.Router();

// Course Model
const Room = require('../../models/Room');
// Test Result Model

// @route   GET api/admin/rooms/fetch-all/:courseId
// @desc    Get All Grades of course
// @access  Public
router.get('/', (req, res) => {
    Room.find(req.query)
        .then(rooms => res.json(rooms));
});

// @route   Post api/admin/rooms
// @desc    Create new class
// @access  Public
router.post('/', (req, res) => {
    console.log(req.body);
    let newRoom = new Room(req.body);
    newRoom.save()
        .then(doc => res.status(200).json(doc))
        .catch(err => res.status(404).json(null));
});

// @route   Put api/admin/rooms
// @desc    update a class
// @access  Public
router.put('/:id', (req, res) => {
    Room.findById(req.params.id)
        .then(doc => {
            doc.name = req.body.name;
            doc.size = req.body.size;
            doc.save()
                .then(e => res.status(200).json(e));
        });
});

module.exports = router;