// routes/auth.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');

// inscription
router.post('/register', ctrl.register);

// connexion
router.post('/login', ctrl.login);

// profil (protégé)
router.get('/profile', auth, ctrl.profile);

module.exports = router;
