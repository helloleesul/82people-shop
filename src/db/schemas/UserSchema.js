const { Schema } = require('mongoose');

const UserSchema = new Schema({
    // _id 부분은 자동으로 Object.id를 넣어주기 때문에 생략
    email: {
        type: String,
        required: true,   
    },
    name: {
        type: String,
        required: true,   
    },
    password: {
        type: String,
        required: true,   
    },
    addressInfo: {
        type: String, 
    },
    grade: {
        type: String,
        default: 1,
    },
    deletedAt: {
        type: Boolean,
        default: false,
    }}, {
        timestamps: true,
    }
);

module.exports = UserSchema;