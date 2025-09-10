// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1]; // format: "Bearer xxx"
  if (!token) return res.status(401).json({ error: 'Accès refusé, token manquant' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // contient { id, email, role, ... }
    next();
  } catch (err) {
    res.status(400).json({ error: 'Token invalide' });
  }
};
