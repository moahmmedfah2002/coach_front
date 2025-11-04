# Utiliser une image Node.js légère (Node 20 est un bon choix)
FROM node:20-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers de dépendances
COPY package.json package-lock.json ./

# Installer les dépendances (npm install)
RUN npm install

# Copier le reste du code de votre application
COPY . .

# [Important] Exposer les ports qu'Expo utilise
# 8081 (Metro Bundler), 19000 (Expo Server), 19006 (Web UI)
EXPOSE 8081
EXPOSE 19000
EXPOSE 19006

# Commande pour démarrer le serveur en mode tunnel
# "npm start" exécute "expo start"
# Le "-- --tunnel" passe l'argument "--tunnel" à "expo start"
CMD ["npm", "start", "--", "--tunnel"]