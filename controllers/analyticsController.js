const Task = require("../models/Task");

const getAnalytics = async (req, res) => {
	try {
		const completedTasks = await Task.countDocuments({
			user: req.user._id,
			status: "Completed",
		});

		const pendingTasks = await Task.countDocuments({
			user: req.user._id,
			status: "Pending",
		});

		const studyTasks = await Task.countDocuments({
			user: req.user._id,
			category: "Study",
		});

		const personalTasks = await Task.countDocuments({
			user: req.user._id,
			category: "Personal",
		});

		const workTasks = await Task.countDocuments({
			user: req.user._id,
			category: "Work",
		});

		const completedTasksData = await Task.find({
			user: req.user._id,
			status: "Completed",
			completedAt: {
				$ne: null,
			},
		});

		const weeklyCompletion = {
			Sun: 0,
			Mon: 0,
			Tue: 0,
			Wed: 0,
			Thu: 0,
			Fri: 0,
			Sat: 0,
		};

		const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

		for (const task of completedTasksData) {
			const dayIndex = task.completedAt.getDay();

			const dayName = days[dayIndex];

			weeklyCompletion[dayName]++;
		}

		res.status(200).json({
			statusDistribution: {
				completed: completedTasks,
				pending: pendingTasks,
			},

			categoryDistribution: {
				Study: studyTasks,
				Personal: personalTasks,
				Work: workTasks,
			},

			weeklyCompletion,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

module.exports = {
	getAnalytics,
};
