const mongoose = require('mongoose');

const DrinkSchema = mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        enumValue: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'category'
        },
        ref: 'category'
    },
    image: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('drink', DrinkSchema);