// routes/comments.js
const express = require('express');
const { PrismaClient } = require('../generated/prisma');
const router = express.Router();
const prisma = new PrismaClient();
const auth = require('../middleware/authMiddleware');



// 🔹 GET tous les commentaires
router.get('/', async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      orderBy: { creation_date: 'desc' },
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// 🔹 GET commentaires d’un spot
router.get('/spot/:spotId', async (req, res) => {
  try {
    const spotId = Number(req.params.spotId);
    const comments = await prisma.comment.findMany({
      where: { spot_id: spotId },
      orderBy: { creation_date: 'desc' },
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// 🔹 POST ajouter un commentaire
router.post('/', auth, async (req, res) => {
  try {
    const { spot_id, comment } = req.body;
    const created = await prisma.comment.create({
      data: {
        spot_id: Number(spot_id),
        user_id: req.user.id, // pris dans le token JWT
        comment,
      },
    });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// 🔹 PUT modifier son commentaire
router.put('/:id', auth, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { comment } = req.body;

    const existing = await prisma.comment.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: 'Commentaire introuvable' });

    // Vérifie que c’est bien son commentaire (ou admin)
    if (existing.user_id !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Non autorisé' });
    }

    const updated = await prisma.comment.update({
      where: { id },
      data: { comment },
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// 🔹 DELETE supprimer son commentaire
router.delete('/:id', auth, async (req, res) => {
  try {
    const id = Number(req.params.id);

    const existing = await prisma.comment.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: 'Commentaire introuvable' });

    // Vérifie que c’est bien son commentaire (ou admin)
    if (existing.user_id !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Non autorisé' });
    }

    await prisma.comment.delete({ where: { id } });
    res.status(204).send(); // pas de contenu, juste succès
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;

