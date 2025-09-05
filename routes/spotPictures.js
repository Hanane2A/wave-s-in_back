const express = require('express');
const { PrismaClient } = require('../generated/prisma');
const router = express.Router();
const prisma = new PrismaClient();

router.get('/:id/pictures', async (req,res) => {
    const { id } = req.params;

    try {
        const pictures = await prisma.picture.findMany({
            where : { spot_id: Number(id) },
            select : { url_picture: true },
        });

        res.json(pictures.map(p => p.url_picture));
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur'});
    }
});

module.exports = router;
