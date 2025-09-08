const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

// GET tous les spots
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

    // Convertir tous les BigInt en string
    const spotsSafe = JSON.parse(JSON.stringify(spots, (_, v) =>
      typeof v === 'bigint' ? v.toString() : v
    ));

    res.json(spotsSafe);
  } catch (error) {
    console.error('Erreur Prisma:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET spot par ID
router.get('/:id', async (req, res) => {
  try {
    const spot = await prisma.spot.findUnique({
      where: { id: BigInt(req.params.id) }, // garde BigInt ici
      include: {
        pictures: true,
        comments: true,
        likesRel: true,
        favorites: true,
        savesRel: true,
      },
    });

    if (!spot) return res.status(404).json({ error: 'Spot non trouvé' });

    // Convertir tous les BigInt en string avant d'envoyer
    const spotSafe = JSON.parse(JSON.stringify(spot, (_, v) =>
      typeof v === 'bigint' ? v.toString() : v
    ));

    res.json(spotSafe);
  } catch (error) {
    console.error('Erreur Prisma:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
