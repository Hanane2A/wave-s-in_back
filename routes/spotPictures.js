const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

// GET toutes les images

router.get('/', async (req, res) => {
  try {
    const pictures = await prisma.picture.findMany();
    const picturesSafe = JSON.parse(JSON.stringify(pictures, (_, v) =>
      typeof v === 'bigint' ? v.toString() : v
    ));
    res.json(picturesSafe);
  } catch (error) {
    console.error('Erreur Prisma:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
