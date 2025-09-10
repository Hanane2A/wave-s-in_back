const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

/**
 * Récupère tous les spots avec leurs relations
 */
router.get('/', async (req, res) => {
  try {
    const spots = await prisma.spot.findMany({
      include: {
        pictures: true,
        comments: true,
        likesRel: true,
        favorites: true,
        savesRel: true,
      },
    });

    res.json(spots);
  } catch (error) {
    console.error('Erreur Prisma GET /api/spot:', error.message);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des spots' });
  }
});

module.exports = router;
