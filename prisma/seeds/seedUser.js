// prisma/seeds/seedsUser.js
const { PrismaClient } = require ('../../generated/prisma');
const prisma = new PrismaClient();

async function main(){
    console.log("users seed ");

    //créer un user
    await prisma.user.create({
        data:{
            firstname: 'Lili',
            name: 'Loulou',
            email: 'lili.loulou@surf.com',
            password: 'lili123', //il faut hasher le mdp
            user_picture: 'https://img.freepik.com/photos-gratuite/portrait-belle-jeune-femme-seduisante-aux-cheveux-longs-habillee-costume-pour-surf-planche-surf-long-du-rivage-pour-sa-lecon-mode-vie-actif-sport-ete-plage-tropique_291650-209.jpg'

        }
    });

    //créer un autre user
     await prisma.user.create({
        data:{
             firstname: 'Passsi',
            name: 'Rap',
            email: 'passirap@surf.com',
            password: 'passi123', //il faut hasher le mdp
            user_picture: 'https://images.genius.com/1d0832a1795a5b6c966078dae85de056.745x746x1.jpg'
        }

     });

     console.log("users seed end");
}

main()
    .catch((e)=> {
        console.error('ereur lors du seeding des users', e);
        process.exit(1);
    })
    .finally(async()=>{

        await prisma.$disconnect();
    });