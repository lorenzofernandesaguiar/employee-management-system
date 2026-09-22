const express = require('express');
const cors = require('cors');

const employeesRoutes = require('./routes/employeesRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/employees', employeesRoutes);

module.exports = app;