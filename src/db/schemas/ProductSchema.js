const { Schema } = require('mongoose');

const ProductSchema = new Schema({
    // _id 부분은 자동으로 Object.id를 넣어주기 때문에 생략
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    manufacturer: {
        type: String,
        required: true,
    },
    imgaeURL: [ String ],
    amount: {
        type: Number,
        required: true,
    },
    salesAmount: {
        type: Number,
        default: 0,
    },
});

module.exports = ProductSchema;