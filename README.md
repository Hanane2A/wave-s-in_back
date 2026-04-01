🌊 **Waves'In - API de Gestion de Spots de Surf**

Bienvenue sur le dépôt Back-end de l'application mobile Waves'In. 
Cette API a été conçue pour fournir et gérer les données dynamiques des spots de surf (coordonnées, difficultés, types de vagues) consommées par l'application mobile.

🚀 **Le Projet**
L'objectif de cette partie du projet était de mettre en place un serveur robuste capable de servir des données structurées et de permettre une gestion fluide du catalogue de spots de surf pour l'utilisateur final.

🛠 **Stack Technique**
- Runtime : Node.js
- Framework : Express.js
- Base de Données : PostgreSQL / SQLite (à adapter selon ton projet)
- ORM : Prisma (ou SQL pur si tu n'as pas utilisé d'ORM)
- Architecture : API RESTful (JSON)

✨ **Fonctionnalités**
- Point d'entrée (Endpoints) : Routes dédiées pour récupérer la liste complète des spots.
- Détails Dynamiques : Gestion des informations spécifiques par spot (Niveau requis, type de sol, saisonnalité).
- Filtrage côté serveur : Capacité à trier les données pour alléger le traitement côté application mobile.
- Liaison Front : CORS configurés pour permettre la communication avec l'application Expo.
🔗 **Liens Utiles**
**Le repo Front (Mobile)** : https://github.com/adatechschool/projet-mobile-surf-Hanane2A-Camille-lt

⚙️ **Installation et Lancement**
Pour tester l'API localement :

**Cloner le repository :**
Bash
git clone https://github.com/Hanane2A/wave-s-in_back
Installer les dépendances :

Bash
cd wave-s-in_back
npm install
Configurer les variables d'environnement :
Créez un fichier .env à la racine et ajoutez votre DATABASE_URL.

**Lancer le serveur :**

Bash
npm run dev
L'API sera accessible par défaut sur http://localhost:3000.

**👥 L'Équipe
**Projet réalisé en binôme par :

**Camille LEBIGOT** - GitHub

**Hanane** - GitHub
