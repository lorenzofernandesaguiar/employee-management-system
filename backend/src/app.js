const express = require('express');
const cors = require('cors');
const path = require('path');

const employeesRoutes = require('./routes/employeesRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../../frontend')));

app.use('/employees', employeesRoutes);

module.exports = app;