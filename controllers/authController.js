const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});
};

const registerUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			res.status(400).json({
				message: "All fields are required",
			});
		}

		const userExists = await User.findOne({ email });

		if (userExists) {
			res.status(400).json({
				message: "Email already exists",
			});
		}

		if (password.length < 6) {
			return res.status(400).json({
				message: "Password must be at least 6 characters long",
			});
		}

		const salt = await bcrypt.genSalt(10);

		const hashedPassword = await bcrypt.hash(password, salt);

		const user = await User.create({
			name,
			email,
			password: hashedPassword,
		});

		res.status(201).json({
			message: "User registered successfully",
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
			},
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			res.status(400).json({
				message: "Email and Password are required",
			});
		}

		const user = await User.findOne({ email });

		if (!user) {
			res.status(401).json({
				message: "Invalid credentials",
			});
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			res.status(401).json({
				message: "Invalid credentials",
			});
		}

		res.status(200).json({
			message: "Login successful",
			token: generateToken(user._id),
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
			},
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

module.exports = {
	registerUser,
	loginUser,
};
