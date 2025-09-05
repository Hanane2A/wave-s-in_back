const express = require('express');
const app = express();
const cors = require('cors'); // importer cors

//ROUTES
const spotsRoutes = require('./routes/spot');           // route pour récupérer tous les spots
const spotPicturesRoutes = require('./routes/spotPictures'); // route pour récupérer les images

app.use(cors()); // permet toutes les origines

app.use('/api/spot', spotsRoutes);   // GET /api/spots
app.use('/spots', spotPicturesRoutes); // GET /spots/:id/pictures


const PORT = 3001;
app.listen(3001, () => console.log('Server running on port 3001'));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});