const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

router.get('/pictures', async (req, res) => {
  try {
    const pictures = await prisma.picture.findMany(); // juste toutes les photos
    res.json(pictures);
  } catch (error) {
    console.error('Erreur Prisma GET /pictures:', error.message, error.stack);
    res.status(500).json({ error: "Erreur serveur lors de la récupération des photos" });
  }
});

module.exports = router;
