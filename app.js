const express = require('express');
const app = express();
const cors = require('cors'); // importer cors

app.use(cors()); // permet toutes les origines
app.use(express.json());

//ROUTES
const spotsRoutes = require('./routes/spot');           // route pour récupérer tous les spots
const spotPicturesRoutes = require('./routes/spotPictures'); // route pour récupérer les images
const usersRoutes = require('./routes/user.js'); // route pour les users



app.use('/spot', spotsRoutes);   // GET /api/spots
app.use('/pictures', spotPicturesRoutes); // GET /spots/pictures
app.use('/users',usersRoutes );




const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});