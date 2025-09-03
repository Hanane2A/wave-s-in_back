// prisma/seeds/seedsComment.js
const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();

async function main() {
    console.log("Début du seeding des commentaires...");

    // Récupérer les IDs des utilisateurs et des spots pour créer les commentaires
    const user1 = await prisma.user.findUnique({ where: { email: 'lili.loulou@surf.com' } });
    const user2 = await prisma.user.findUnique({ where: { email: 'tom.green@surf.com' } });
    const spot1 = await prisma.spot.findFirst({ orderBy: { id: 'asc' } });
    const spot2 = await prisma.spot.findFirst({ skip: 1, orderBy: { id: 'asc' } });

    if (!user1 || !user2 || !spot1 || !spot2) {
        console.error("Erreur: Les utilisateurs ou les spots n'ont pas été trouvés. Assurez-vous d'abord de lancer le seed des utilisateurs et des spots.");
        process.exit(1);
    }

    const commentsToSeed = [
        {
            spot_id: spot1.id,
            user_id: user1.id,
            comment: 'Super spot, les vagues étaient incroyables ce matin !',
            creation_date: new Date('2025-09-01T10:00:00Z')
        },
        {
            spot_id: spot1.id,
            user_id: user2.id,
            comment: 'Attention aux rochers à marée basse, mais sinon top!',
            creation_date: new Date('2025-09-01T14:30:00Z')
        },
        {
            spot_id: spot2.id,
            user_id: user1.id,
            comment: 'Idéal pour les débutants, pas trop de monde.',
            creation_date: new Date('2025-09-02T11:00:00Z')
        }
    ];

    await prisma.comment.createMany({
        data: commentsToSeed,
        skipDuplicates: true,
    });

    console.log("Seeding des commentaires terminé.");
}

main()
    .catch((e) => {
        console.error('Erreur lors du seeding des commentaires:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });