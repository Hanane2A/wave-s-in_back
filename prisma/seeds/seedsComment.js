const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();

async function main() {
  console.log("Début du seeding des commentaires...");

  // Récupération de deux users précis
  const user1 = await prisma.user.findUnique({ where: { email: 'lili.loulou@surf.com' } });
  const user2 = await prisma.user.findUnique({ where: { email: 'tom.green@surf.com' } });

  // Récupération de quelques spots
  const spot1 = await prisma.spot.findFirst({ orderBy: { id: 'asc' } });
  const spot2 = await prisma.spot.findFirst({ skip: 1, orderBy: { id: 'asc' } });

  if (!user1 || !user2 || !spot1 || !spot2) {
    console.error("Erreur: Les utilisateurs ou les spots n'ont pas été trouvés.");
    process.exit(1);
  }

  const commentsToSeed = [
    {
      user_id: user1.id,
      spot_id: spot1.id,
      comment: "Super spot, les vagues étaient incroyables ce matin 🌊",
      creation_date: new Date('2025-09-01T10:00:00Z'),
    },
    {
      user_id: user2.id,
      spot_id: spot1.id,
      comment: "Un peu de monde mais l’ambiance est sympa 🤙",
      creation_date: new Date('2025-09-01T12:30:00Z'),
    },
    {
      user_id: user1.id,
      spot_id: spot2.id,
      comment: "Idéal pour débuter, pas trop de courant 👌",
      creation_date: new Date('2025-09-02T11:00:00Z'),
    },
  ];

  await prisma.comment.createMany({
    data: commentsToSeed,
    skipDuplicates: true,
  });

  console.log("Seeding des commentaires terminé.");
}

main()
  .catch((e) => {
    console.error("Erreur lors du seeding des commentaires:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
