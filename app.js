const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Connect to database
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/patients', require('./routes/patient'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
