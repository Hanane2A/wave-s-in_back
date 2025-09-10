// scripts/hashPasswords.js
require('dotenv').config(); // au cas où tu utilises DATABASE_URL depuis .env
const { PrismaClient } = require('../generated/prisma');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

// Détecte un hash bcrypt
function isBcryptHash(str) {
  return typeof str === 'string' && (str.startsWith('$2a$') || str.startsWith('$2b$') || str.startsWith('$2y$'));
}

async function main() {
  // 1) récupérer tous les users
  const users = await prisma.user.findMany({
    select: { id: true, email: true, password: true },
  });

  let updated = 0;

  for (const u of users) {
    if (!u.password) continue;

    if (!isBcryptHash(u.password)) {
      const hashed = await bcrypt.hash(u.password, SALT_ROUNDS);
      await prisma.user.update({
        where: { id: u.id },
        data: { password: hashed },
      });
      updated++;
      console.log(`✅ ${u.email} → hashé`);
    } else {
      console.log(`↪️  ${u.email} déjà hashé (ok)`);
    }
  }

  console.log(`\nTerminé. ${updated} mot(s) de passe mis à jour.`);
}

main()
  .catch((e) => {
    console.error('Erreur script:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
