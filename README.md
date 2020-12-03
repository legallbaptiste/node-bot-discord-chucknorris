# node-bot-discord-chucknorris
Création d'un bot Discord qui raconte des blagues de Chuck Norris.
Le but : prendre en main l'utilisation d'API.
Techno utilisé : NodeJS + Docker

Pour lancer l'app il suffit d'installer les packages et lancer le serveur : 
npm i
npx nodemon

Puis aller sur cette adresse là : http://localhost:3000/discord si une page s'affiche alors le serveur est lancé.
Vous pouvez lancer également via Docker en utilisant cette commande à la racine du projet : 

docker build -t <your username>/node-bot-discord-chucknorris .
docker run -p 49160:8080 -d <your username>/node-bot-discord-chucknorris
