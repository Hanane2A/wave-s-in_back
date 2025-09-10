// controllers/authController.js
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 🔹 inscription
exports.register = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Vérifie si email déjà utilisé
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ error: "Email déjà utilisé" });

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
        role: "USER", // ou autre par défaut
      },
    });

    res.status(201).json({ message: "Utilisateur créé", user: { id: user.id, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// 🔹 connexion
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: "Email ou mot de passe incorrect" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: "Email ou mot de passe incorrect" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// 🔹 profil (protégé par authMiddleware)
exports.profile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true, username: true, role: true },
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};
