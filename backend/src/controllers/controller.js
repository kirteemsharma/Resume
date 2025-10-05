const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getStatus = (req, res) => {
  res.json({ status: 'API is running' });
};

exports.getResumes = async (req, res) => {
  try {
    const resumes = await prisma.resume.findMany();
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch resumes' });
  }
};
