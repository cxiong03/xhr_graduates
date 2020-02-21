require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const PORT = 3000;

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', err => console.error(error));
db.once('open', () => console.log( 'You are connected to your Database...' ));

app.listen(PORT, () => console.log(`Server listening on port ${ PORT }`));