const express = require('express');
const { PrismaClient } = require('../generated/prisma'); // ou '../../generated/prisma'
const router = express.Router();
const prisma = new PrismaClient();

// GET /api/spots
router.get('/', async (req, res) => {
  try {
    const spots = await prisma.spot.findMany({
      select: { id: true, name: true, region: true, latitude: true, longitude: true }
    });
    res.json(spots);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
