const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},

		description: {
			type: String,
			default: "",
		},

		category: {
			type: String,
			enum: ["Study", "Personal", "Work"],
			default: "Personal",
		},
		priority: {
			type: String,
			enum: ["Low", "Medium", "High"],
			default: "Medium",
		},
		status: {
			type: String,
			enum: ["Pending", "Completed"],
			default: "Pending",
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model("Task", taskSchema);
