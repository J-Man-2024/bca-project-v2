// Imported dotenv and Loaded environment vaiables
require("dotenv").config();

// Imported Dependencies
const express = require("express");

const connectDB = require("./config/db");

const { protect } = require("./middleware/authMiddleware");

const authRoutes = require("./routes/authRoutes");

// Read Configuration
const PORT = process.env.PORT || 5000;

// Created App
const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Application Startup
const startServer = async () => {
	await connectDB();

	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
};

startServer();
