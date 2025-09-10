const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

// ✅ Récupérer tous les favoris
router.get('/', async (req, res) => {
  try {
    const favorites = await prisma.favorite.findMany({
      include: { user: true, spot: true },
    });
    res.json(favorites);
  } catch (error) {
    console.error('Erreur GET /favorites:', error.message);
    res.status(500).json({ error: "Erreur serveur lors de la récupération des favoris" });
  }
});

// ✅ Ajouter un favori
router.post('/', async (req, res) => {
  try {
    const { user_id, spot_id } = req.body;

    if (!user_id || !spot_id) {
      return res.status(400).json({ error: 'user_id et spot_id sont requis' });
    }

    const favorite = await prisma.favorite.create({
      data: { user_id, spot_id },
    });

    res.json(favorite);
  } catch (error) {
    console.error('Erreur POST /favorites:', error.message);
    res.status(500).json({ error: "Erreur serveur lors de l’ajout d’un favori" });
  }
});

module.exports = router;
