const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();

async function main() {
  console.log('Début du seeding pour les spots de surf en Bretagne...');

  const bretagneSpots = [
    { name: 'Audierne', description: 'Spot réputé pour ses vagues puissantes.', latitude: 48.016, longitude: -4.382, region : 'Bretagne' },
    { name: 'Baie des Trépassés', description: 'Spot exposé à la houle, idéal pour les surfeurs confirmés.', latitude: 48.043, longitude: -4.717, region : 'Bretagne' },
    { name: 'Barre d\'Etel', description: 'Un spot de classe mondiale, mais dangereux, pour les experts.', latitude: 47.653, longitude: -3.237, region : 'Bretagne' },
    { name: 'Brest Blanc Sablons', description: 'Une grande plage de sable fin, adaptée aux débutants.', latitude: 48.337, longitude: -4.786, region : 'Bretagne' },
    { name: 'Crozon', description: 'Plusieurs spots autour de la presqu\'île de Crozon.', latitude: 48.243, longitude: -4.502 , region : 'Bretagne'},
    { name: 'Dinard', description: 'Un spot près de Saint-Malo, avec de belles vagues à marée haute.', latitude: 48.643, longitude: -2.057, region : 'Bretagne' },
    { name: 'Donnant', description: 'Spot très apprécié sur Belle-Île-en-Mer.', latitude: 47.369, longitude: -3.203, region : 'Bretagne' },
    { name: 'Douarnenez', description: 'Plusieurs spots dans la baie de Douarnenez.', latitude: 48.096, longitude: -4.341, region : 'Bretagne' },
    { name: 'Fort Bloqué', description: 'Spot très fréquenté, avec une vague longue et agréable.', latitude: 47.747, longitude: -3.493, region : 'Bretagne' },
    { name: 'Guidel Plage de la falaise', description: 'Spot régulier, parfait pour le surf et le bodyboard.', latitude: 47.784, longitude: -3.486, region : 'Bretagne' },
    { name: 'L\'ile aux Vaches', description: 'Un reef break exigeant près de Lorient.', latitude: 47.695, longitude: -3.425, region : 'Bretagne' },
    { name: 'La Palue', description: 'Un spot de référence en Finistère, souvent puissant.', latitude: 48.225, longitude: -4.568, region : 'Bretagne' },
    { name: 'La Torche', description: 'Le spot le plus célèbre de Bretagne, idéal pour tous les niveaux.', latitude: 47.794, longitude: -4.342, region : 'Bretagne'},
    { name: 'Le Dossen', description: 'Spot de repli avec de belles vagues en fonction des marées.', latitude: 48.673, longitude: -4.011, region : 'Bretagne' },
    { name: 'Le Petit Minou', description: 'Un spot de qualité près de Brest, idéal pour le spectacle.', latitude: 48.349, longitude: -4.619, region : 'Bretagne'},
    { name: 'Locquirec', description: 'Un spot facile d\'accès pour les débutants.', latitude: 48.694, longitude: -3.649, region : 'Bretagne'},
    { name: 'Lostmarc\'h', description: 'Un spot de repli avec de belles vagues.', latitude: 48.225, longitude: -4.568, region : 'Bretagne' },
    { name: 'Perros Guirec', description: 'Plusieurs spots autour de la côte de granit rose.', latitude: 48.816, longitude: -3.456, region : 'Bretagne' },
    { name: 'Pors Carn', description: 'Un spot populaire pour les débutants.', latitude: 47.800, longitude: -4.351, region : 'Bretagne' },
    { name: 'Pors-Nevez', description: 'Un spot plus exposé, pour les surfeurs intermédiaires.', latitude: 48.096, longitude: -4.341, region : 'Bretagne' },
    { name: 'Port Blanc', description: 'Une plage abritée, idéale pour l\'apprentissage.', latitude: 48.749, longitude: -3.255, region : 'Bretagne' },
    { name: 'Quiberon Port Blanc', description: 'Un spot avec un beau cadre pour surfer.', latitude: 47.469, longitude: -3.125, region : 'Bretagne' },
    { name: 'Sainte Barbe', description: 'Une grande plage pour le surf et la baignade.', latitude: 47.481, longitude: -3.07, region : 'Bretagne' },
    { name: 'Saint Lunaire', description: 'Un spot de surf populaire près de Dinard.', latitude: 48.647, longitude: -2.128, region : 'Bretagne' },
    { name: 'Trestel', description: 'Un spot de repli, avec des vagues accessibles.', latitude: 48.807, longitude: -3.344, region : 'Bretagne' },
    { name: 'Tronoën', description: 'Un spot sauvage avec de belles vagues.', latitude: 47.869, longitude: -4.382, region : 'Bretagne' },
  ];

  await prisma.spot.createMany({
    data: bretagneSpots.map(spot => ({
      ...spot,
      likes: 0,
    })),
    skipDuplicates: true,
  });
  
  console.log(`${bretagneSpots.length} spots ont été ajoutés.`);
  console.log('Seeding de la table Spot terminé.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });