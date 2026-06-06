require("dotenv").config();

const express = require("express");

const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

const app = express();

//Middlewares
app.use(express.json());

// Routes
app.get("/", (req,res) => {
    res.json({
        message: "AI Task Management API Running",
    });    
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
});

// Application Startup
const startServer = async() => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);        
    })
}

startServer();