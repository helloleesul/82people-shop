const mongoose = require('mongoose');
const { UserSchema } = require('../schemas');

const User = mongoose.model('User', UserSchema);

module.exports = User;
