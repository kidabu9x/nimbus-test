const express = require('express');
const router = express.Router();

// Test Model
const Test = require('../../models/Test');

// ----------------------------------API for user---------------------------------

// @route   GET api/test/:code
// @desc    Get a test
// @access  Public
router.get('/:code', (req, res) => {
    Test.findOne({
        handle: req.params.code
    }).then(testSettings => {
        if (!testSettings) {
            res.json({error: 'Sai mã code'});
        }
        else if (!testSettings.active) {
            res.json({error: 'Code chưa được kích hoạt !'})
        }
        else {
            res.json(testSettings);
        }
    })
});


// ----------------------------------End API for user----------------------------


module.exports = router;