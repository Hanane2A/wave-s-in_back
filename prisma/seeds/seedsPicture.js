const { PrismaClient } = require('../../generated/prisma');
const axios = require('axios');
require('dotenv').config();

const prisma = new PrismaClient();

async function fetchImages(spotName) {
  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query: `${spotName} beach`, // on recherche plage + nom du spot
        per_page: 3,                // 3 images
        orientation: 'landscape',
      },
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    });

    // Retourne juste les URLs
    return response.data.results.map((img) => img.urls.regular);
  } catch (err) {
    console.error(`Erreur lors de la récupération des images pour ${spotName}:`, err.message);
    return [];
  }
}

async function main() {
  console.log('Suppression des anciennes photos...');
  await prisma.picture.deleteMany();

  console.log('Récupération des spots existants...');
  const spots = await prisma.spot.findMany();

  for (const spot of spots) {
    console.log(`Ajout des images pour ${spot.name}...`);
    const images = await fetchImages(spot.name);

    // Si Unsplash ne trouve rien, fallback sur une recherche générique "beach"
    const finalImages = images.length ? images : await fetchImages('beach');

    const data = finalImages.map((url) => ({
      spot_id: spot.id,
      url_picture: url,
    }));

    await prisma.picture.createMany({
      data,
      skipDuplicates: true,
    });
  }

  console.log('Seed des photos terminé ✅');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
