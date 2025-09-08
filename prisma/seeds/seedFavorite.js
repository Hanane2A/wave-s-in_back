const { PrismaClient } = require('../generated/prisma'); // adapte le chemin si besoin
const prisma = new PrismaClient();

async function main() {
  // ⚠️ assure-toi que les users et spots existent déjà
  // car favorites dépend de user_id et spot_id
  
  const favorites = await prisma.favorite.createMany({
    data: [
      { user_id: 1, spot_id: 1 },
      { user_id: 1, spot_id: 2 },
      { user_id: 2, spot_id: 1 },
    ],
    skipDuplicates: true, // évite les erreurs si déjà insérés
  });

  console.log('Seed favorites:', favorites);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
