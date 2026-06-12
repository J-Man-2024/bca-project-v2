const Task = require("../models/Task");

const getDashboardStats = async (req, res) => {
	try {
		const totalTasks = await Task.countDocuments({
			user: req.user._id,
		});

		const completedTasks = await Task.countDocuments({
			user: req.user._id,
			status: "Completed",
		});

		const pendingTasks = await Task.countDocuments({
			user: req.user._id,
			status: "Pending",
		});

		const recentTasks = await Task.find({
			user: req.user._id,
		})
			.sort({ createdAt: -1 })
			.limit(5);

		let completionPercentage = 0;

		if (totalTasks > 0) {
			completionPercentage = Math.round(
				(completedTasks / totalTasks) * 100,
			);
		}

		res.status(200).json({
			totalTasks,
			completedTasks,
			pendingTasks,
			completionPercentage,
			recentTasks,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

module.exports = {
	getDashboardStats,
};
