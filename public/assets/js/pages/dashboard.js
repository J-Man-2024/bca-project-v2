import { renderNavbar } from "../components/navbar.js";
import { initializeTheme, toggleTheme } from "../utils/theme.js";
import { checkAuth, logout } from "../utils/auth.js";
import { getDashboardStats } from "../services/dashboardService.js";
import { getInsights } from "../services/aiService.js";

checkAuth();
initializeTheme();
renderNavbar();

const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", toggleTheme);

const logoutBtn = document.getElementById("logout-btn");

logoutBtn.addEventListener("click", logout);

const totalTasksElement = document.getElementById("total-tasks");

const completedTasksElement = document.getElementById("completed-tasks");

const pendingTasksElement = document.getElementById("pending-tasks");

const completionPercentageElement = document.getElementById(
	"completion-percentage",
);

const recentTaskList = document.getElementById("recent-tasks-list");

const aiInsightElement = document.getElementById("ai-insight");

const insight = await getInsights();

aiInsightElement.innerHTML = insight.insight
	.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
	.replace(/\n/g, "<br>");

function renderRecentTasks(tasks) {
	recentTaskList.innerHTML = "";

	for (const task of tasks) {
		recentTaskList.innerHTML += `
			<div class="recent-task">

				<span>
					${task.title}
				</span>

				<span>
					${task.status}
				</span>

			</div>
			
		`;
	}
}

async function loadInsights() {
	try {
		const insight = await getInsights();

		aiInsightElement.textContent = insight.insight;
	} catch (error) {
		console.error(error);
	}
}

async function loadDashboardStats() {
	try {
		const stats = await getDashboardStats();

		totalTasksElement.textContent = stats.totalTasks;

		completedTasksElement.textContent = stats.completedTasks;

		pendingTasksElement.textContent = stats.pendingTasks;

		completionPercentageElement.textContent = `${stats.completionPercentage}%`;

		renderRecentTasks(stats.recentTasks);
	} catch (error) {
		console.error(error);
	}
}

loadDashboardStats();
