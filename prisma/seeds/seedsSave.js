const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();

async function main() {
  console.log("saves seed begin");

  // Récupère quelques users et spots
  const users = await prisma.user.findMany({ take: 3 });
  const spots = await prisma.spot.findMany({ take: 3 });

  if (users.length < 2 || spots.length < 2) {
    console.error("Pas assez de users ou spots en base pour créer des saves !");
    return;
  }

  // Crée des saves factices
  await prisma.save.createMany({
    data: [
      { user_id: users[0].id, spot_id: spots[2].id },
      { user_id: users[1].id, spot_id: spots[0].id },
      { user_id: users[2].id, spot_id: spots[1].id },
    ],
    skipDuplicates: true,
  });

  console.log("saves seed end");
}

main()
  .catch((e) => {
    console.error("Erreur lors du seeding des saves:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
