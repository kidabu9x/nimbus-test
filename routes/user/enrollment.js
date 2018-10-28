const express = require('express');
const router = express.Router();
const CONFIG = require('../../config.json');
// Course Model
const Enrollment = require('../../models/Enrollment');
const Classes = require('../../models/Class');
// Test Result Model

// @route   Post api/admin/enrollments/:id/note
// @desc    Write a note
// @access  Public
router.post('/:id/confirm-email', async (req, res) => {
    let enroll = await Enrollment.findById(req.params.id);
    enroll.emailed.confirmed_at = new Date(); 
    enroll.emailed.is_confirmed = true;
    enroll.save();
    let cl = await Classes.findById(enroll.class_id);
    res.json({
        url : cl.fb_group_url
    });
});

module.exports = router;