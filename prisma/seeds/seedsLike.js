// prisma/seeds/seedsLike.js
const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();

async function main() {
    console.log("Début du seeding des likes...");

    // Récupérer les 3 premiers utilisateurs de la base de données
    const users = await prisma.user.findMany({
        take: 3,
        select: {
            id: true
        }
    });

    // Récupérer les 3 premiers spots de la base de données
    const spots = await prisma.spot.findMany({
        take: 3,
        select: {
            id: true
        }
    });

    const likesToSeed = [
        // L'utilisateur 1 aime le spot 1
        { user_id: users[0].id, spot_id: spots[0].id },
        // L'utilisateur 2 aime le spot 1
        { user_id: users[1].id, spot_id: spots[0].id },
        // L'utilisateur 1 aime le spot 2
        { user_id: users[0].id, spot_id: spots[1].id }
    ];

    await prisma.like.createMany({
        data: likesToSeed,
        skipDuplicates: true,
    });

    console.log("Seeding des likes terminé.");
}

main()
    .catch((e) => {
        console.error('Erreur lors du seeding des likes:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });