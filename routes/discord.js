var express = require('express');
var router = express.Router();
require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require('axios');
const fs = require('fs')
const envfile = require('envfile')


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


let prefix = '%';
client.on('message', message => {
    // si c'est un bot qui parle on passe
    if (message.author.bot) return;
    // si le message ne commence pas par le prefix on passe
    if (!message.content.startsWith(prefix)) return;
    // on récupère la commande sans le prefix
    const commandBody = message.content.slice(prefix.length);
    // on split la commande avec les arguments
    const args = commandBody.split(' ');
    // on récupère la commande
    const command = args.shift().toLowerCase();
    if (command === "ping") {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Pong! La latence est de ${timeTaken}ms.`);
    }else if (command === "joke") {
        // on compte ne nombre d'argument
        const numArgs = args.map(x=>parseFloat(x));
        console.log(numArgs);
        // s'il y en a pas alors on met une blague random
        if(numArgs.length == 0) {
            axios.get('http://api.icndb.com/jokes/random')
                .then(function (response) {
                    // handle success
                    message.reply(response.data.value.joke);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
            // si l'argument est un nombre alors on renvoie l'id associé à la blague
        } else if(numArgs.length > 0 && typeof parseInt(args[0]) === 'number'){
            axios.get('http://api.icndb.com/jokes/'+parseInt(args[0])+'')
                .then(function (response) {
                    // handle success
                    message.reply(" Blague n°"+args[0]+", "+response.data.value.joke);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);c
                })
            // si le premier argument est un string alors on renvoie la blague avec la catégorie associé
        } else if(numArgs.length > 0 && typeof args[0] === "string") {
            axios.get('http://api.icndb.com/jokes/random?limitTo="' + args + '"')
                .then(function (response) {
                    // handle success

                    message.reply(" Catégorie : " + args.toString() + ", " + response.data.value.joke);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
        }
     // on compte le nombre de blague
    }else if (command === "jokeCount") {
        axios.get('http://api.icndb.com/jokes/count')
            .then(function (response) {
                // handle success
                message.reply("Chuck Norris à "+ response.data.value +" blagues dans sa poche");
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
        // on récupère les catégories
    } else if (command === "categorie") {
        axios.get('http://api.icndb.com/categories')
            .then(function (response) {
                // handle success
                message.reply("Chuck Norris à "+ response.data.value.toString() +" comme catégorie de blague");
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    } else if (command === "prefix") {
        if(args.length > 1) {
            return;
        }
        prefix = args[0];
        message.reply("Chuck Norris adore ton nouveau préfixe : "+ prefix);
    }
});



client.login(process.env.API_KEY);

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Discord' });
});

module.exports = router;
