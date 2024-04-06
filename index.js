const express = require('express');
const quranRoutes = require('./router');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/quran', quranRoutes);
app.all('*', (req,res)=>{
    res.send("This Route isn’t Valid , Please Use a Valid Route ")
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
