//packages
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB);
const db = mongoose.connection;

db.on('connected', () => console.log('connecting DB success'));
db.on('disconnected', () => console.warn('disconnect'));
db.on('error', err => console.error(err));
db.on('reconnectedFailed', () => console.error('reconnect failed'));

app.listen(port, () => {
	console.log(`connecting to ${port}`);
});
