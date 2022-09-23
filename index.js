import express from "express";
import firebase from 'firebase';
import cors from 'cors';

const firebaseConfig = {
    apiKey: "AIzaSyAbWXDG1roAL-qqIbJ899G0I4TkFYgV2wc",
    authDomain: "hellogame-44bd0.firebaseapp.com",
    databaseURL: "https://hellogame-44bd0-default-rtdb.firebaseio.com",
    projectId: "hellogame-44bd0",
    storageBucket: "hellogame-44bd0.appspot.com",
    messagingSenderId: "629474594042",
    appId: "1:629474594042:web:17065b51bc21c13de7cd43"
  };

firebase.initializeApp(firebaseConfig)
let database = firebase.database()
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors())

app.get('/ranking', async (req, res) =>{
    let results = [];

    let a = await firebase.database().ref('ranking').orderByValue().once('value').then(function(snapshot)
    {
        
        snapshot.forEach(function(child) {
            results.push({ jogador: child.key, pontuacao: child.val() });
        });
       
    }) 

    results.sort(function(a, b) {
        if(a.pontuacao > b.pontuacao) {
          return -1;
        } else {
          return true;
        }
      });

    res.send(results);
})

app.listen(port, () => {
    console.log('Aplicacao rodando');
})
