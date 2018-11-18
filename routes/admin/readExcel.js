const express = require('express');
const router = express.Router();

// @route   GET api/admin/readExcel
// @desc    Get All Obj in Excel
// @access  Public
router.get('/', (req, res) => {
    console.log('readExcel');
});

// @route   GET api/admin/readExcel/getFile
// @desc    Get All Obj in Excel
// @access  Public
router.post('/getFile', (req, res) => {
    console.log('getFile');
    console.log(req);
});



module.exports = router;