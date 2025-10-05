require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

const prisma = new PrismaClient();
const app = express();

app.use(cors()); // Enable CORS for all origins (open during judging)
app.use(express.json());

app.get('/api/status', (req, res) => {
  res.json({ status: 'API is running' });
});

// Upload multiple resumes as files, parse & save placeholder data
app.post('/api/resumes', upload.array('files', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: { code: "FIELD_REQUIRED", field: "files", message: "File upload required" } });
    }

    // For demo, create dummy Resume entries with filename as name, skills empty
    const created = [];
    for (const file of req.files) {
      const resume = await prisma.resume.create({
        data: {
          name: file.originalname,
          skills: 'demo skills' // In real app, parse and embed here
        }
      });
      created.push(resume);
    }

    res.json({ uploaded: created.length, resumes: created });
  } catch (error) {
    res.status(500).json({ error: { code: "INTERNAL_ERROR", message: error.message } });
  }
});

// Get resumes with pagination and optional search query
app.get('/api/resumes', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const q = req.query.q || '';

    const where = q ? { name: { contains: q, mode: 'insensitive' } } : {};

    const resumes = await prisma.resume.findMany({
      where,
      skip: offset,
      take: limit,
      orderBy: { id: 'asc' }
    });

    const nextOffset = resumes.length === limit ? offset + limit : null;

    res.json({ items: resumes, next_offset: nextOffset });
  } catch (error) {
    res.status(500).json({ error: { code: "INTERNAL_ERROR", message: error.message } });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
