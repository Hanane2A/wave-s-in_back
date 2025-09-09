const express = require('express');
const { PrismaClient } = require('../generated/prisma');
const router = express.Router();
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();


//get User

router.get('/', async(requestAnimationFrame, res)=>{
    try{
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (err){
        console.error('Erreur GET users', err);
        res.status(500).json({error: 'Erreur serveur'});
        
    }
});










module.exports = router;
