const express = require('express');
const { PrismaClient } = require('../generated/prisma');
const router = express.Router();
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();


//get User

router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { id: 'desc' },
      select: {
        id: true,
        firstname: true,
        name: true,
        email: true,
        user_picture: true,
        // pas de password en sortie
      },
    });
    res.json(users);
  } catch (err) {
    console.error('GET /users:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// GET /users/:id - détail
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'ID invalide' });

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        firstname: true,
        name: true,
        email: true,
        user_picture: true,
      },
    });
    if (!user) return res.status(404).json({ error: 'Utilisateur introuvable' });

    res.json(user);
  } catch (err) {
    console.error('GET /users/:id:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// POST /users - création
router.post('/', async (req, res) => {
  try {
    const { firstname, name, email, password, user_picture } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: 'email et password sont requis' });
    }

    const hashed = await bcrypt.hash(password, 10);

    const created = await prisma.user.create({
      data: {
        firstname: firstname ?? null,
        name: name ?? null,
        email,
        password: hashed, // mot de passe hashé
        user_picture: user_picture ?? null,
      },
    });

    // on retire le password avant de répondre
    const { password: _, ...safeUser } = created;
    res.status(201).json(safeUser);
  } catch (err) {
    if (err?.code === 'P2002') {
      return res.status(409).json({ error: 'Cet email est déjà utilisé' });
    }
    console.error('POST /users:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// PUT /users/:id - mise à jour
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'ID invalide' });

    const { firstname, name, email, password, user_picture } = req.body || {};
    const data = {};
    if (firstname !== undefined) data.firstname = firstname;
    if (name !== undefined) data.name = name;
    if (email !== undefined) data.email = email;
    if (user_picture !== undefined) data.user_picture = user_picture;
    if (password !== undefined) {
      data.password = await bcrypt.hash(password, 10);
    }

    const updated = await prisma.user.update({
      where: { id },
      data,
    });

    const { password: _, ...safeUser } = updated;
    res.json(safeUser);
  } catch (err) {
    if (err?.code === 'P2002') return res.status(409).json({ error: 'Cet email est déjà utilisé' });
    if (err?.code === 'P2025') return res.status(404).json({ error: 'Utilisateur introuvable' });
    console.error('PUT /users/:id:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// DELETE /users/:id
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'ID invalide' });

    await prisma.user.delete({ where: { id } });
    res.status(204).end();
  } catch (err) {
    if (err?.code === 'P2025') return res.status(404).json({ error: 'Utilisateur introuvable' });
    console.error('DELETE /users/:id:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});



module.exports = router;
