const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const blogController = require('../controllers/blog');

router.post('/post', [
        body('title').isLength({min: 5}).withMessage('Input title minimal 5 character'),
        body('body').isLength({min: 5}).withMessage('Input body minimal 5 character'),
    ],
    blogController.creteBlog);

module.exports = router;