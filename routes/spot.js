const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

/**
 * GET /api/spot
 * Récupère tous les spots
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
    console.error('Erreur Prisma GET /api/spot:', error.message, error.stack);
    res.status(500).json({ error: "Erreur serveur lors de la récupération des spots" });
  }
});

/**
 * GET /api/spot/:id
 * Récupère un spot par son ID
 */
router.get('/:id', async (req, res) => {
  try {
    const spotId = parseInt(req.params.id, 10); // ✅ conversion en Int
    if (isNaN(spotId)) {
      return res.status(400).json({ error: 'ID invalide' });
    }

    const spot = await prisma.spot.findUnique({
      where: { id: spotId },
      include: {
        pictures: true,
        comments: true,
        likesRel: true,
        favorites: true,
        savesRel: true,
      },
    });

    if (!spot) {
      return res.status(404).json({ error: 'Spot non trouvé' });
    }

    res.json(spot);
  } catch (error) {
    console.error('Erreur Prisma GET /api/spot/:id:', error.message, error.stack);
    res.status(500).json({ error: "Erreur serveur lors de la récupération du spot" });
  }
});

module.exports = router;

