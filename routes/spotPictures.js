const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const pictures = await prisma.picture.findMany(); // juste toutes les photos
    res.json(pictures);
  } catch (error) {
    console.error('Erreur Prisma GET /pictures:', error.message, error.stack);
    res.status(500).json({ error: "Erreur serveur lors de la récupération des photos" });
  }
});

// Route pour récupérer les images d’un spot spécifique
router.get('/:id', async (req, res) => {
  const spotId = parseInt(req.params.id);
  if (isNaN(spotId)) return res.status(400).json({ error: "ID invalide" });

  try {
    const pictures = await prisma.picture.findMany({
      where: { spot_id: spotId }
    });
    res.json(pictures);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur pour les images" });
  }
});

module.exports = router;
