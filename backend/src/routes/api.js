const express = require('express');
const router = express.Router();
const { getStatus, getResumes } = require('../controllers/controller');

router.get('/status', getStatus);
router.get('/resumes', getResumes);

module.exports = router;
