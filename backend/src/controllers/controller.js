const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getStatus = (req, res) => {
  res.json({ status: 'API is running' });
};

exports.uploadResumes = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: { code: "FIELD_REQUIRED", field: "files", message: "File upload required" } });
    }
    const createdResumes = [];
    for (const file of req.files) {
      const created = await prisma.resume.create({
        data: { name: file.originalname, skills: "example skills" }
      });
      createdResumes.push(created);
    }
    res.json({ uploaded: createdResumes.length, resumes: createdResumes });
  } catch (err) {
    res.status(500).json({ error: { code: "INTERNAL_ERROR", message: err.message } });
  }
};

exports.getResumes = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const q = req.query.q || '';

    const filter = q ? { name: { contains: q, mode: "insensitive" } } : {};

    const items = await prisma.resume.findMany({
      where: filter,
      skip: offset,
      take: limit,
      orderBy: { id: 'asc' }
    });

    const next_offset = items.length === limit ? offset + limit : null;

    res.json({ items, next_offset });
  } catch (err) {
    res.status(500).json({ error: { code: "INTERNAL_ERROR", message: err.message } });
  }
};
