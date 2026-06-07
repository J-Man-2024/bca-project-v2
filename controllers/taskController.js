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

const getTasks = async (req, res) => {
	try {
		const tasks = await Task.find({
			user: req.user._id,
		});

		res.status(200).json(tasks);
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

const getTaskById = async (req, res) => {
	try {
		const task = await Task.findById(req.params.id);

		if (!task) {
			return res.status(404).json({
				message: "Task not found",
			});
		}

		if (task.user.toString() !== req.user._id.toString()) {
			return res.status(403).json({
				message: "Access denied",
			});
		}

		res.status(200).json(task);
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

const updateTask = async (req, res) => {
	try {
		const task = await Task.findById(req.params.id);

		if (!task) {
			return res.status(404).json({
				message: "Task not found",
			});
		}

		if (task.user.toString() !== req.user._id.toString()) {
			return res.status(403).json({
				message: "Access denied",
			});
		}

		if (req.body.title !== undefined) {
			task.title = req.body.title;
		}

		if (req.body.description !== undefined) {
			task.description = req.body.description;
		}

		if (req.body.category !== undefined) {
			task.description = req.body.description;
		}

		if (req.body.category !== undefined) {
			task.category = req.body.category;
		}

		if (req.body.priority !== undefined) {
			task.priority = req.body.priority;
		}

		if (req.body.status !== undefined) {
			task.status = req.body.status;
		}

		const updatedTask = await task.save();

		res.status(200).json(updatedTask);
	} catch (error) {
		if (error.name === "ValidationError") {
			return res.status(400).json({
				message: error.message,
			});
		}

		res.status(500).json({
			message: error.message,
		});
	}
};

const deleteTask = async (req, res) => {
	try {
		const task = await Task.findById(req.params.id);

		if (!task) {
			return res.status(404).json({
				message: "Task not found",
			});
		}

		if (task.user.toString() !== req.user._id.toString()) {
			return res.status(403).json({
				message: "Access denied",
			});
		}

		await task.deleteOne();

		res.status(200).json({
			message: "Task deleted successfully",
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

module.exports = {
	createTask,
	getTasks,
	getTaskById,
	updateTask,
	deleteTask,
};
