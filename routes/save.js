const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

// ✅ Récupérer tous les saves
router.get('/', async (req, res) => {
  try {
    const saves = await prisma.save.findMany({
      include: { user: true, spot: true },
    });
    res.json(saves);
  } catch (error) {
    console.error('Erreur GET /saves:', error.message);
    res.status(500).json({ error: "Erreur serveur lors de la récupération des saves" });
  }
});

// ✅ Ajouter un save
router.post('/', async (req, res) => {
  try {
    const { user_id, spot_id } = req.body;

    if (!user_id || !spot_id) {
      return res.status(400).json({ error: 'user_id et spot_id sont requis' });
    }

    const save = await prisma.save.create({
      data: { user_id, spot_id },
    });

    res.json(save);
  } catch (error) {
    console.error('Erreur POST /saves:', error.message);
    res.status(500).json({ error: "Erreur serveur lors de l’ajout d’un save" });
  }
});

// ✅ Supprimer un save par user_id et spot_id
router.delete('/', async (req, res) => {
  try {
    const { user_id, spot_id } = req.body;

    if (!user_id || !spot_id) {
      return res.status(400).json({ error: 'user_id et spot_id sont requis' });
    }

    const deletedSave = await prisma.save.deleteMany({
      where: { user_id, spot_id },
    });

    if (deletedSave.count === 0) {
      return res.status(404).json({ error: 'Save non trouvé' });
    }

    res.json({ message: 'Save supprimé avec succès' });
  } catch (error) {
    console.error('Erreur DELETE /saves:', error.message);
    res.status(500).json({ error: "Erreur serveur lors de la suppression d’un save" });
  }
});

module.exports = router;
