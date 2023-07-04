//packages
import express from 'express';
import mongoose from 'mongoose';

const app = express();

const port = process.env.PORT || 3000;

mongoose.connect('');

const db = mongoose.connection;

db.on('connected', () => console.log('connecting DB success'));
db.on('error', err => console.error(err));

app.listen(port, () => {
	console.log(`connecting to ${port}`);
});
