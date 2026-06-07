const Task = require("../models/Task");

const createTask = async (req, res) => {
	try {
		const { title, description, category, priority } = req.body;

		if (!title) {
			return res.status(400).json({
				message: "Title is required",
			});
		}

		const task = await Task.create({
			title,
			description,
			category,
			priority,
			user: req.user._id,
		});

		res.status(201).json(task);
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

module.exports = {
	createTask,
};
