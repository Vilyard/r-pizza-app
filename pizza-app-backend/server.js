const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require ('cors');

const pizzasService = require('./services/pizzas.service');
const ordersService = require('./services/orders.service');
const connectionString = 'INSERT_CONNECTION_STRING_HERE';
let client = null;
let pizzasCollection = null;

MongoClient.connect(connectionString)
    .then((_client) => {
        client = _client;
        pizzasCollection = _client.db('pizza-app').collection('pizzas');
        pizzasService.registerMongoClient(_client);
        ordersService.registerMongoClient(_client);
        bootstrap();
    }).catch(console.error); 


function bootstrap(){
const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.end('Hello from Express!');
});

// pizza.service
app.get('/pizzas', pizzasService.getAll);
app.get('/pizzas/:id', pizzasService.getOne);
app.post('/pizzas', pizzasService.insertOne);
app.delete('/pizzas/:id', pizzasService.deleteOne);
app.put('/pizzas/:id', pizzasService.updateOne);

//orders.service
app.post('/orders', ordersService.insertOne);
app.get('/orders', ordersService.getAll);
// not REST-full 
app.get('/pizzas-html', async (req, res) => {
    try {
        const pizzas = await pizzasCollection.find().toArray();
        const renderView = `
            ${
                pizzas.map(pizza => `
                    <div>
                        <h1>${pizza.name}</h1>
                        <img src="${pizza.image}" />
                    </div>
                `).join('<br/>')
            }
        `; 
        res.send(renderView);
    } catch (e) {
        console.error(e);
    }
});
app.use(express.static('public'));
//app.get(...)
app.listen(8080, function() {
    console.log('listening on port 8080...');
})
};