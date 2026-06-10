import { checkAuth, logout } from "../utils/auth.js";
import { getDashboardStats } from "../services/analyticsService.js";

checkAuth();

const logoutBtn = document.getElementById("logout-btn");

const totalTasksElement = document.getElementById("total-tasks");

const completedTasksElement = document.getElementById("completed-tasks");

const pendingTasksElement = document.getElementById("pending-tasks");

const completionPercentageElement = document.getElementById(
	"completion-percentage",
);

logoutBtn.addEventListener("click", logout);

async function loadDashboardStats() {
	try {
		const stats = await getDashboardStats();

		totalTasksElement.textContent = stats.totalTasks;

		completedTasksElement.textContent = stats.completedTasks;

		pendingTasksElement.textContent = stats.pendingTasks;

		completionPercentageElement.textContent = `${stats.completionPercentage}%`;
	} catch (error) {
		console.error(error);
	}
}

loadDashboardStats();
