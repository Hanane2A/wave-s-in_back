const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

/**
 * GET /likes
 * Récupère tous les likes
 */
router.get('/', async (req, res) => {
  try {
    const likes = await prisma.like.findMany({
      include: { user: true, spot: true } // si tu veux les infos liées
    });
    res.json(likes);
  } catch (error) {
    console.error('Erreur GET /likes:', error.message);
    res.status(500).json({ error: "Erreur serveur lors de la récupération des likes" });
  }
});

/**
 * POST /likes
 * Ajoute un like à un spot par un utilisateur
 * { "user_id": 1, "spot_id": 2 }
 */
router.post('/', async (req, res) => {
  const { user_id, spot_id } = req.body;

  try {
    const like = await prisma.like.create({
      data: { user_id, spot_id }
    });
    res.json(like);
  } catch (error) {
    console.error('Erreur POST /likes:', error.message);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: "Ce user a déjà liké ce spot" });
    }
    res.status(500).json({ error: "Erreur serveur lors de l'ajout du like" });
  }
});

/**
 * DELETE /likes/:id
 * Supprime un like par son ID
 */
router.delete('/:id', async (req, res) => {
  const likeId = Number(req.params.id);

  try {
    await prisma.like.delete({
      where: { id: likeId }
    });
    res.json({ message: "Like supprimé avec succès" });
  } catch (error) {
    console.error('Erreur DELETE /likes/:id:', error.message);
    res.status(500).json({ error: "Erreur serveur lors de la suppression du like" });
  }
});

module.exports = router;
