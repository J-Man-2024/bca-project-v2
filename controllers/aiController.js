const Task = require("../models/Task");
const groq = require("../config/groq");

const getInsights = async (req, res) => {
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

		const completionRate =
			totalTasks > 0
				? Math.round((completedTasks / totalTasks) * 100)
				: 0;

		const prompt = `
			Analyze this user's task management data.

			Total Tasks: ${totalTasks}
			Completed Tasks: ${completedTasks}
			Pending Tasks: ${pendingTasks}
			Completion Rate: ${completionRate}%

			Study Tasks: ${studyTasks}
			Personal Tasks: ${personalTasks}
			Work Tasks: ${workTasks}

			Provide the response in plain text.

			Format:

			Productivity Summary:
			...

			Observations:
			...

			Recommendations:
			...

			Do not use markdown.
			Do not use ** symbols.
			Keep under 80 words.

			Keep the response under 100 words.
			`;

		const chatCompletion = await groq.chat.completions.create({
			model: "llama-3.3-70b-versatile",

			messages: [
				{
					role: "system",
					content: "You are a productivity coach.",
				},
				{
					role: "user",
					content: prompt,
				},
			],
		});

		const insight = chatCompletion.choices[0].message.content;

		res.status(200).json({
			insight,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

module.exports = { getInsights };
