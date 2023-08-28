const Category = require('../models/category.model');
const Drink = require('../models/drink.model');
const fs = require('fs');

const getCategories = async (req,res) => {
    res.send(await Category.find());
}

const postCategory = async (req,res) => {
    const {name} = req.fields;
    const file = req.files.image;
    if (file.size === 0) return res.send({message:'Please upload a valid photo'});
    let mongoPath = `${Date.now()}-${file.name}`;
    let newPath = `./client/images/${mongoPath}`;
    fs.copyFileSync(file.path,newPath);
    fs.unlinkSync(file.path);
    const newCategory = new Category({
        name,
        image: mongoPath
    });
    res.send(await newCategory.save());
}

const patchCategory = async (req,res) => {
    const {_id, name} = req.fields;
    const category = await Category.findOne({_id});
    if (name) category.name = name;
    const file = req.files?.image;
    if (file && file.size !== 0) {
        let mongoPath = `${Date.now()}-${file.name}`;
        let newPath = `./client/images/${mongoPath}`;
        fs.copyFileSync(file.path,newPath);
        fs.unlinkSync(file.path);
        category.image = mongoPath
    }
    res.send(await category.save());
}

const deleteCategory = async (req,res) => {
    const {_id} = req.query;
    const drink = await Drink.findOne({category: _id});
    if (drink) return res.send({message:'There is a drink attached to this category'});
    res.send(await Category.deleteOne({_id}));   
}

module.exports = {
    getCategories,
    postCategory,
    patchCategory,
    deleteCategory
}