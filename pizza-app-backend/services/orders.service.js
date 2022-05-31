let ordersCollection;
exports.registerMongoClient = (_client) => {
    ordersCollection = _client.db('pizza-app').collection('orders');
};


exports.insertOne = async (req, res) => {
    const order = req.body;
    try {
        await ordersCollection.insertOne(order);
        res.send({message: 'Success on writing order', data: JSON.stringify(order)});
    } catch (e) {
        console.error(e);
        if (e.code === 11000) {
            res.send({message: 'Order with that ID already exists'});
        }
        res.sendStatus(400);
    }
};

exports.getAll = async (req, res) => {
    try {
        const orders = await ordersCollection.find().toArray();
        return res.json(orders);
    } catch (e) {
        console.error(e);
        res.sendStatus(400);
    }
};