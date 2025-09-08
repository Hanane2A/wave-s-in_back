const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();

async function main() {
  console.log("likes seed begin");

  // récupère quelques users pour tester
  const users = await prisma.user.findMany({ take: 3 }); 
  // ⚠️ récupère aussi quelques spots qui doivent exister
  const spots = await prisma.spot.findMany({ take: 3 });

  if (users.length < 2 || spots.length < 2) {
    console.error("Pas assez de users ou spots en base pour créer des likes !");
    return;
  }

  // Crée des likes factices
  await prisma.like.createMany({
    data: [
      { user_id: users[0].id, spot_id: spots[0].id },
      { user_id: users[0].id, spot_id: spots[1].id },
      { user_id: users[1].id, spot_id: spots[0].id },
      { user_id: users[2].id, spot_id: spots[2].id },
    ],
    skipDuplicates: true,
  });

  console.log("likes seed end");
}

main()
  .catch((e) => {
    console.error("Erreur lors du seeding des likes:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

  