const Drink = require('../models/drink.model');
const fs = require('fs');

const getDrinks = async (req,res) => {
    const {category} = req.query;
    const query = {};
    if (category) query.category = category;
    res.send(await Drink.find(query).sort({price: 'asc'}));
}

const postDrink = async (req,res) => {
    const {name,price,category} = req.fields;
    const file = req.files.image;
    if (file.size === 0) return res.send({message:'Please upload a valid photo'});
    let mongoPath = `${Date.now()}-${file.name}`;
    let newPath = `./client/images/${mongoPath}`;
    fs.copyFileSync(file.path,newPath);
    fs.unlinkSync(file.path);
    const newDrink = new Drink({
        name,
        price: parseFloat(price),
        category,
        image: mongoPath
    });
    res.send(await newDrink.save());
}

const patchDrink = async (req,res) => {
    const {_id,name,price,category} = req.fields;
    const drink = await Drink.findOne({_id});
    if (name) drink.name = name
    if (price) drink.price = parseFloat(price);
    if (category) drink.category = category;
    const file = req.files?.image;
    if (file && file.size !== 0){
        let mongoPath = `${Date.now()}-${file.name}`;
        let newPath = `./client/images/${mongoPath}`;
        fs.copyFileSync(file.path,newPath);
        fs.unlinkSync(file.path);
        drink.image = mongoPath;
    } 
    res.send(await drink.save());
}

const deleteDrink = async (req,res) => {
    const {_id} = req.query;
    res.send(await Drink.deleteOne({_id}));   
}

module.exports = {
    getDrinks,
    postDrink,
    patchDrink,
    deleteDrink
}