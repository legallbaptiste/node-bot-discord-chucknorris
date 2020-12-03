# node-bot-discord-chucknorris
Création d'un bot Discord qui raconte des blagues de Chuck Norris.
<br>
Le but : prendre en main l'utilisation d'API.
<br>
Techno utilisé : NodeJS + Docker
<br>
Pour lancer l'app il suffit d'installer les packages et lancer le serveur : 
<br>
npm i
<br>
npx nodemon

Puis aller sur cette adresse là : http://localhost:3000/discord si une page s'affiche alors le serveur est lancé.

Vous pouvez lancer également via Docker en utilisant cette commande à la racine du projet : 


docker build -t <your username>/node-bot-discord-chucknorris .
<br>
docker run -p 49160:8080 -d <your username>/node-bot-discord-chucknorris
