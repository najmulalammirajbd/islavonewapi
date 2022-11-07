const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tfgke.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express()

app.use(bodyParser.json());
app.use(cors());

const port = 5000



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const islavosongs = client.db("islavoaudio").collection("islavomusic");
    const islavoprimiumsongs = client.db("islavoaudio").collection("islavopremium");
    const islavoshowss = client.db("islavoaudio").collection("islavoshow");

    app.get( '/allimusics', async (req, res) =>{
        const cursor = islavosongs.find({});
        const allimusics = await cursor.toArray();
        res.send(allimusics);
    });
    app.post('/islavomusics', async (req, res) => {
        const imusics = req.body;
        const result = await islavosongs.insertOne(imusics);
        console.log(result);
        res.send(imusics);
    })
    //....................

    app.get( '/alliprimiums', async (req, res) =>{
        const cursor = islavoprimiumsongs.find({});
        const alliprimiums = await cursor.toArray();
        res.send(alliprimiums);
    });
    app.post('/islavoprimiums', async (req, res) => {
        const iprimiums = req.body;
        const result = await islavoprimiumsongs.insertOne(iprimiums);
        console.log(result);
        res.send(iprimiums);
    });


    //....................

    app.get( '/allishows', async (req, res) =>{
        const cursor = islavoshowss.find({});
        const allishow = await cursor.toArray();
        res.send(allishow);
    });
    app.post('/islavoshows', async (req, res) => {
        const ishow = req.body;
        const result = await islavoshowss.insertOne(ishow);
        console.log(result);
        res.send(ishow);
    });
});


// client.connect(err => {
//     const users = client.db("ISLAVO").collection("service");
//     console.log(err);
//     app.post('/users', (req, res) => {
//         const users = req.body;
//         users.insertOne(users)
//             .then(result => {
//                 res.send(result)
//             })
//     })
// });


// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
// })

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(process.env.PORT || port)