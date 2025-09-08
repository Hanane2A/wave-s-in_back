// prisma/seeds/seedsSave.js
const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding saves…');

  const users = await prisma.user.findMany({ take: 3, select: { id: true } });
  const spots = await prisma.spot.findMany({ take: 3, select: { id: true } });

  if (users.length < 2 || spots.length < 2) {
    throw new Error(
      `Pas assez de données pour seed saves. users=${users.length}, spots=${spots.length}`
    );
  }

  const savesToSeed = [
    { user_id: users[0].id, spot_id: spots[1].id },
    { user_id: users[1].id, spot_id: spots[0].id },
    { user_id: users[0].id, spot_id: spots[2] ? spots[2].id : spots[0].id },
  ];

  await prisma.save.createMany({
    data: savesToSeed,
    skipDuplicates: true,
  });

  console.log('Saves OK ✅');
}

main()
  .catch((e) => {
    console.error('Erreur seed saves:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
