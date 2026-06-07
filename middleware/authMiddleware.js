const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
	try {
		let token;

		const authHeader = req.headers.authorization;

		if (authHeader && authHeader.startsWith("Bearer ")) {
			token = authHeader.split(" ")[1];

			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			req.user = await User.findById(decoded.id).select("-password");

			return next();
		}

		return res.status(401).json({
			message: "Not authorized, token missing",
		});
	} catch (error) {
		return res.status(401).json({
			message: "Not authorized, invalid token",
		});
	}
};

module.exports = { protect };
