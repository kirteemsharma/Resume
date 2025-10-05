const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const controller = require('./controller');

const router = express.Router();

router.get('/status', controller.getStatus);
router.post('/resumes', upload.array('files', 10), controller.uploadResumes);
router.get('/resumes', controller.getResumes);

module.exports = router;
