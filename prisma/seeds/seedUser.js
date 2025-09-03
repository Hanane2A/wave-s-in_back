// prisma/seeds/seedsUser.js
const { PrismaClient } = require ('../../generated/prisma');
const prisma = new PrismaClient();


const usersToSeed = [

  { firstname: 'Lili', name: 'Loulou', email: 'lili.loulou@surf.com', password: 'lili123', user_picture: 'https://img.freepik.com/photos-gratuite/portrait-belle-jeune-femme-seduisante-aux-cheveux-longs-habillee-costume-pour-surf-planche-surf-long-du-rivage-pour-sa-lecon-mode-vie-actif-sport-ete-plage-tropique_291650-209.jpg' },
  { firstname: 'Passsi', name: 'Rap', email: 'passirap@surf.com', password: 'passi123', user_picture: 'https://images.genius.com/1d0832a1795a5b6c966078dae85de056.745x746x1.jpg' },
  { firstname: 'Tom', name: 'Green', email: 'tom.green@surf.com', password: 'tom123', user_picture: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { firstname: 'Eva', name: 'Mendez', email: 'eva.mendez@surf.com', password: 'eva123', user_picture: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { firstname: 'Lucas', name: 'Chen', email: 'lucas.chen@surf.com', password: 'lucas123', user_picture: 'https://randomuser.me/api/portraits/men/3.jpg' },
  { firstname: 'Chloe', name: 'Durand', email: 'chloe.durand@surf.com', password: 'chloe123', user_picture: 'https://randomuser.me/api/portraits/women/4.jpg' },
  { firstname: 'Alex', name: 'Martin', email: 'alex.martin@surf.com', password: 'alex123', user_picture: 'https://randomuser.me/api/portraits/men/5.jpg' },
  { firstname: 'Léa', name: 'Dubois', email: 'lea.dubois@surf.com', password: 'lea123', user_picture: 'https://randomuser.me/api/portraits/women/6.jpg' },
  { firstname: 'Sam', name: 'Lefebvre', email: 'sam.lefebvre@surf.com', password: 'sam123', user_picture: 'https://randomuser.me/api/portraits/men/7.jpg' },
  { firstname: 'Manon', name: 'Roux', email: 'manon.roux@surf.com', password: 'manon123', user_picture: 'https://randomuser.me/api/portraits/women/8.jpg' },
  { firstname: 'Hugo', name: 'Garcia', email: 'hugo.garcia@surf.com', password: 'hugo123', user_picture: 'https://randomuser.me/api/portraits/men/9.jpg' },
  { firstname: 'Sarah', name: 'Petit', email: 'sarah.petit@surf.com', password: 'sarah123', user_picture: 'https://randomuser.me/api/portraits/women/10.jpg' },
  { firstname: 'Leo', name: 'Blanc', email: 'leo.blanc@surf.com', password: 'leo123', user_picture: 'https://randomuser.me/api/portraits/men/11.jpg' },
  { firstname: 'Marie', name: 'Leroy', email: 'marie.leroy@surf.com', password: 'marie123', user_picture: 'https://randomuser.me/api/portraits/women/12.jpg' },
  { firstname: 'Kevin', name: 'Moreau', email: 'kevin.moreau@surf.com', password: 'kevin123', user_picture: 'https://randomuser.me/api/portraits/men/13.jpg' },
  { firstname: 'Julie', name: 'Fournier', email: 'julie.fournier@surf.com', password: 'julie123', user_picture: 'https://randomuser.me/api/portraits/women/14.jpg' },
  { firstname: 'Mehdi', name: 'Lemoine', email: 'mehdi.lemoine@surf.com', password: 'mehdi123', user_picture: 'https://randomuser.me/api/portraits/men/15.jpg' },
  { firstname: 'Anais', name: 'Laurent', email: 'anais.laurent@surf.com', password: 'anais123', user_picture: 'https://randomuser.me/api/portraits/women/16.jpg' },
  { firstname: 'Baptiste', name: 'Dubois', email: 'baptiste.dubois@surf.com', password: 'baptiste123', user_picture: 'https://randomuser.me/api/portraits/men/17.jpg' },
  { firstname: 'Elise', name: 'Thomas', email: 'elise.thomas@surf.com', password: 'elise123', user_picture: 'https://randomuser.me/api/portraits/women/18.jpg' }
];

async function main() {
  console.log("users seed begain");

  await prisma.user.createMany({
    data: usersToSeed,
    skipDuplicates: true,
  });

  console.log("users seed end");
}

main()
  .catch((e) => {
    console.error('Erreur lors du seeding des utilisateurs:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


