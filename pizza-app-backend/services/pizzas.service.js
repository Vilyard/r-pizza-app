let pizzasCollection;
exports.registerMongoClient = (_client) => {
    pizzasCollection = _client.db('pizza-app').collection('pizzas');
};

exports.getAll = async (req, res) => {
    try {
        const { priceFrom, priceSmallSort, priceBigSort, ingredients, onDiscount } = req.query;
        let filterQuery = {};
        if (priceFrom) {
            filterQuery.priceSmall = { $gte: parseInt(priceFrom) };
            filterQuery.priceBig = { $gte: parseInt(priceFrom) };
        }
        if (ingredients) {
            filterQuery.ingredients = {$regex: /доматен сос/i,}
        }
        if (onDiscount) {
            filterQuery.tags = {$elemMatch: { $eq: 'discount' }}
        }
        let sortQuery = {};
        if (priceSmallSort) {
            sortQuery.priceSmall = priceSmallSort
        }
        if (priceBigSort) {
            sortQuery.priceBig = priceBigSort
        }
        console.log(filterQuery);
        const pizzas = await pizzasCollection.find(filterQuery).sort(sortQuery).toArray();
        return res.json(pizzas);
    } catch (e) {
        console.error(e);
        res.sendStatus(400);
    }
};

exports.getOne = async (req, res) => {
    const id = req.params.id;
    try {
        const pizza = await pizzasCollection.findOne({_id: id});
        res.json(pizza);
    } catch (e) {
        console.error(e);
    }
};


exports.insertOne = async (req, res) => {
    
    const pizza = req.body;
    console.log(req.body);
    try {
        await pizzasCollection.insertOne(pizza);
        // res.end({message: 'Success on writing pizza', data: JSON.stringify(pizza)});
        // res.json();
        // res.send();
        res.end();
    } catch (e) {
        console.error(e);
        if (e.code === 11000) {
            res.send({message: 'Pizza with that ID already exists'});
        }
        res.sendStatus(400);
    }
};

exports.deleteOne = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pizzasCollection.deleteOne({_id: id});
        res.json(result);
    } catch (e) {
        console.error(e);
    }
};

exports.updateOne = async (req, res) => {
    const id = req.params.id;
    const newPizza = req.body;
    try {
        const result = await pizzasCollection.findOneAndUpdate({_id: id}, {$set: newPizza});
        res.json(result);
    } catch (e) {
        console.error(e);
    }
};

