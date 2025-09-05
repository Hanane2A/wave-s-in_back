const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();

async function main() {
  console.log('Suppression des données existantes...');
//   await prisma.spot.deleteMany(); // Cette ligne doit être ici !


  const bretagneSpots = [
    { name: 'Plage la Torche-Tronoën', description: 'Le spot le plus célèbre de Bretagne, idéal pour tous les niveaux.', latitude: 47.794, longitude: -4.342, region: 'Bretagne' },
    { name: 'La de la Palue', description: 'Spot puissant et réputé en presqu’île de Crozon.', latitude: 48.225, longitude: -4.568, region: 'Bretagne' },
    { name: 'Plage de Dossen', description: 'Spot de repli avec de belles vagues en fonction des marées.', latitude: 48.673, longitude: -4.011, region: 'Bretagne' },
    { name: 'Audierne', description: 'Spot réputé pour ses vagues puissantes.', latitude: 48.016, longitude: -4.382, region: 'Bretagne' },
    { name: 'Crozon', description: 'Plusieurs spots autour de la presqu’île de Crozon.', latitude: 48.243, longitude: -4.502, region: 'Bretagne' },
  ];

  const charenteSpots = [
    { name: 'Plage du Petit Bec', description: 'Spot rocheux sur l’île de Ré, zone de surf connue.', latitude: 46.253494, longitude: -1.519705, region: 'Charente-Maritime' },
    { name: 'Plage de la Grande-Conche', description: 'Plage avec potentiel de surf sur la côte de Royan.', latitude: 45.616919, longitude: -1.014862, region: 'Charente-Maritime' },
    { name: 'Plage de Vert Bois', description: 'Beach break exposé sur l’île d’Oléron, assez constant.', latitude: 45.8800, longitude: -1.2673, region: 'Charente-Maritime' },
    { name: 'Plage des Huttes', description: 'Spot exposé au nord-ouest de l’île d’Oléron.', latitude: 46.0277, longitude: -1.3990, region: 'Charente-Maritime' },
    { name: 'Conche des Baleines', description: 'Plage au nord de l’île de Ré, exposée à la houle.', latitude: 46.2422, longitude: -1.5781, region: 'Charente-Maritime' },
  ];

  const girondeSpots = [
    { name: 'Lacanau Océan', description: 'Spot emblématique de la Gironde, tous niveaux.', latitude: 44.7405, longitude: -1.2028, region: 'Gironde' },
    { name: 'Carcans Plage', description: 'Beach break régulier et puissant.', latitude: 45.061, longitude: -1.195, region: 'Gironde' },
    { name: 'Cap Ferret', description: 'Plage océanique à vagues puissantes.', latitude: 44.656, longitude: -1.244, region: 'Gironde' },
    { name: 'Le Porge', description: 'Grande plage sauvage, spot régulier.', latitude: 44.863, longitude: -1.219, region: 'Gironde' },
    { name: 'Soulac', description: 'Spot au nord de la Gironde, varié selon les bancs de sable.', latitude: 45.510, longitude: -1.135, region: 'Gironde' },
  ];

  const landesSpots = [
    { name: 'Hossegor La Gravière', description: 'Spot mondialement connu, vagues puissantes et creuses.', latitude: 43.6769, longitude: -1.4385, region: 'Landes' },
    { name: 'Hossegor La Nord', description: 'Spot mythique pour ses grosses vagues.', latitude: 43.6764, longitude: -1.4380, region: 'Landes' },
    { name: 'Capbreton La Piste', description: 'Beach break puissant, connu pour ses barrels.', latitude: 43.6605, longitude: -1.4420, region: 'Landes' },
    { name: 'Mimizan-Plage', description: 'Beach break accessible, idéal pour tous niveaux.', latitude: 44.2134, longitude: -1.2960, region: 'Landes' },
    { name: 'Biscarrosse', description: 'Spot très populaire, vagues régulières, bonne ambiance surf.', latitude: 44.4246, longitude: -1.2585, region: 'Landes' },
  ];

  const normandieSpots = [
    { name: 'Siouville', description: 'Spot principal de Normandie, régulier.', latitude: 49.583, longitude: -1.833, region: 'Normandie' },
    { name: 'Etretat', description: 'Spot spectaculaire au pied des falaises.', latitude: 49.706, longitude: 0.206, region: 'Normandie' },
    { name: 'Pourville', description: 'Beach break exposé près de Dieppe.', latitude: 49.911, longitude: 1.032, region: 'Normandie' },
    { name: 'Le Rozel', description: 'Spot de sable populaire, régulier.', latitude: 49.483, longitude: -1.8, region: 'Normandie' },
    { name: 'Surtainville', description: 'Spot exposé avec de belles droites.', latitude: 49.45, longitude: -1.82, region: 'Normandie' },
  ];

  const paysBasqueSpots = [
    { name: 'Biarritz Côte des Basques', description: 'Spot historique et emblématique du surf en France.', latitude: 43.478, longitude: -1.567, region: 'Pays Basque' },
    { name: 'Anglet Les Cavaliers', description: 'Spot puissant et réputé.', latitude: 43.521, longitude: -1.523, region: 'Pays Basque' },
    { name: 'Guéthary Les Alcyons', description: 'Reef break puissant, grosses vagues.', latitude: 43.425, longitude: -1.615, region: 'Pays Basque' },
    { name: 'Hendaye', description: 'Grande plage, idéale pour débutants.', latitude: 43.372, longitude: -1.784, region: 'Pays Basque' },
    { name: 'Belharra', description: 'Spot mythique de grosses vagues au large.', latitude: 43.417, longitude: -1.717, region: 'Pays Basque' },
  ];

  const pacaSpots = [
    { name: 'Carro', description: 'Spot rocheux réputé près de Martigues.', latitude: 43.327, longitude: 5.048, region: 'PACA' },
    { name: 'La Couronne', description: 'Spot accessible, vagues régulières.', latitude: 43.330, longitude: 5.050, region: 'PACA' },
    { name: 'Marseille Le Prado', description: 'Plage de surf urbaine, accessible.', latitude: 43.263, longitude: 5.376, region: 'PACA' },
    { name: 'Brutal Beach', description: 'Spot très connu à Toulon.', latitude: 43.123, longitude: 5.938, region: 'PACA' },
    { name: 'Cap Saint Louis, Le Liouquet', description: 'Petit reef break apprécié localement.', latitude: 43.169, longitude: 5.645, region: 'PACA' },
  ];

  const corseSpots = [
    { name: 'Ajaccio Capo Di Feno', description: 'Spot emblématique d’Ajaccio.', latitude: 41.944, longitude: 8.619, region: 'Corse' },
    { name: 'Algajola', description: 'Beach break régulier en Balagne.', latitude: 42.611, longitude: 8.855, region: 'Corse' },
    { name: 'Farinole', description: 'Spot réputé du Cap Corse.', latitude: 42.784, longitude: 9.333, region: 'Corse' },
    { name: 'Calvi', description: 'Spot accessible pour débutants.', latitude: 42.566, longitude: 8.757, region: 'Corse' },
  ];

  const languedocRoussillonSpots = [
    { name: 'Canet Plage', description: 'Spot de repli, venté, accessible.', latitude: 42.699, longitude: 3.037, region: 'Languedoc Roussillon' },
    { name: 'Gruissan', description: 'Spot exposé, souvent venté.', latitude: 43.106, longitude: 3.089, region: 'Languedoc Roussillon' },
    { name: 'Palavas-les-Flots', description: 'Spot urbain, accessible à tous.', latitude: 43.528, longitude: 3.933, region: 'Languedoc Roussillon' },
    { name: 'Leucate', description: 'Spot exposé, réputé pour le vent et le surf.', latitude: 42.909, longitude: 3.039, region: 'Languedoc Roussillon' },
    { name: 'Port-la-Nouvelle', description: 'Spot varié selon les bancs de sable.', latitude: 43.018, longitude: 3.054, region: 'Languedoc Roussillon' },
  ];

  const allSpots = [
    ...bretagneSpots, ...charenteSpots, ...girondeSpots, ...landesSpots,
    ...normandieSpots, ...paysBasqueSpots, ...pacaSpots, ...corseSpots, ...languedocRoussillonSpots
  ];

  await prisma.spot.createMany({
    data: allSpots.map(spot => ({ ...spot, likes: 0 })),
    skipDuplicates: true,
  });

  console.log(`${allSpots.length} spots ont été ajoutés.`);
  console.log('Seeding de la table Spot terminé.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
