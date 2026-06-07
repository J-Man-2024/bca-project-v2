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
