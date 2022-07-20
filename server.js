const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
dotenv.config({ path: './config/config.env' });
const transactions = require('./routes/transactions');
const app = express();
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

app.use(express.json());

if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
}

app.use('/api/v1/transactions', transactions);

// We want to have route for the route that will load the build folder's index.html
if (process.env.NODE_ENV === "production") {
    // We set the static folder
    app.use(express.static('client/build'));
    // For any other route we will send the index.html file
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

app.listen(PORT, (_req, _res) => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}...`.yellow.bold);
    connectDB();
});