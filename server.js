require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = 3000;

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/', express.static('public'));

const db = mongoose.connection;

db.on('error', error => console.error(error));
db.once('open', () => console.log( 'You are connected to your Database...' ));

app.use(express.json());
app.use(cors());

const graduatesRouter = require('./routes/profile');

app.use('/api/graduates', graduatesRouter);

app.listen(PORT, () => console.log(`Server listening on port ${ PORT }`));