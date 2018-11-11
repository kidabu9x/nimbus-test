const express = require('express');
const router = express.Router();

// @route   GET api/admin/readExcel
// @desc    Get All Obj in Excel
// @access  Public
router.get('/', (req, res) => {
    res.send('this is excel read file router');
    res.send(req);
});



module.exports = router;