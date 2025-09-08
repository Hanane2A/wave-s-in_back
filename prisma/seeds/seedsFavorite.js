// prisma/seeds/seedsFavorite.js
const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding favorites…');

  // Récupère quelques users et spots
  const users = await prisma.user.findMany({ take: 3, select: { id: true } });
  const spots = await prisma.spot.findMany({ take: 3, select: { id: true } });

  if (users.length < 2 || spots.length < 2) {
    throw new Error(
      `Pas assez de données pour seed favorites. users=${users.length}, spots=${spots.length}`
    );
  }

  const favoritesToSeed = [
    { user_id: users[0].id, spot_id: spots[0].id },
    { user_id: users[1].id, spot_id: spots[0].id },
    { user_id: users[0].id, spot_id: spots[1].id },
  ];

  await prisma.favorite.createMany({
    data: favoritesToSeed,
    skipDuplicates: true, // évite les erreurs si déjà inséré
  });

  console.log('Favorites OK ✅');
}

main()
  .catch((e) => {
    console.error('Erreur seed favorites:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
