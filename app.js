require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors'); // importer cors

app.use(cors()); // permet toutes les origines
app.use(express.json());

//ROUTES
const spotsRoutes = require('./routes/spot');           // route pour récupérer tous les spots
const spotPicturesRoutes = require('./routes/spotPictures'); // route pour récupérer les images
const usersRoutes = require('./routes/user.js'); // route pour les users
const likesRoutes = require('./routes/like');
const favoritesRoutes = require('./routes/favorite');
const commentRoutes = require('./routes/comment');
const savesRoutes = require('./routes/save');



app.use('/spot', spotsRoutes);   // GET 
app.use('/pictures', spotPicturesRoutes); // GET /spots/pictures
app.use('/users',usersRoutes );
app.use('/likes', likesRoutes);
app.use('/favorites', favoritesRoutes);
app.use('/comments' , commentRoutes);

app.use('/auth', require('./routes/auth'));
app.use('/saves', savesRoutes);


//404 
app.use((req, res) => {
  res.status(404).json({ error: "Route inconnue" });
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});