import { renderNavbar } from "../components/navbar.js";
import { initializeTheme, toggleTheme } from "../utils/theme.js";
import { checkAuth, logout } from "../utils/auth.js";
import { getAnalytics } from "../services/analyticsService.js";

let statusChartInstance;
let categoryChartInstance;
let weeklyChartInstance;

initializeTheme();
renderNavbar();
checkAuth();

const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", async () => {
	toggleTheme();

	destroyCharts();

	await loadAnalytics();
});

const logoutBtn = document.getElementById("logout-btn");

logoutBtn.addEventListener("click", logout);
loadAnalytics();

const statusChart = document.getElementById("status-chart");

const categoryChart = document.getElementById("category-chart");

const weeklyChart = document.getElementById("weekly-chart");

async function loadAnalytics() {
	try {
		const data = await getAnalytics();

		renderAnalytics(data);
	} catch (error) {
		console.error(error);
	}
}

function getChartColors() {
	const isDarkMode =
		document.documentElement.getAttribute("data-theme") === "dark";

	return {
		textColor: isDarkMode ? "#f8fafc" : "#1e293b",

		gridColor: isDarkMode ? "#334155" : "#e2e8f0",
	};
}

function createStatusChart(data) {
	const { textColor } = getChartColors();

	statusChartInstance = new Chart(statusChart, {
		type: "doughnut",

		data: {
			labels: ["Completed", "Pending"],

			datasets: [
				{
					data: [
						data.statusDistribution.completed,
						data.statusDistribution.pending,
					],
				},
			],
		},

		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: {
					labels: {
						color: textColor,
					},
				},
			},
		},
	});
}

function createCategoryChart(data) {
	const { textColor } = getChartColors();

	categoryChartInstance = new Chart(categoryChart, {
		type: "pie",

		data: {
			labels: ["Study", "Personal", "Work"],

			datasets: [
				{
					data: [
						data.categoryDistribution.Study,
						data.categoryDistribution.Personal,
						data.categoryDistribution.Work,
					],
				},
			],
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: {
					labels: {
						color: textColor,
					},
				},
			},
		},
	});
}

function createWeeklyChart(data) {
	const { textColor, gridColor } = getChartColors();

	weeklyChartInstance = new Chart(weeklyChart, {
		type: "bar",

		data: {
			labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],

			datasets: [
				{
					label: "Completed Tasks",

					data: [
						data.weeklyCompletion.Sun,
						data.weeklyCompletion.Mon,
						data.weeklyCompletion.Tue,
						data.weeklyCompletion.Wed,
						data.weeklyCompletion.Thu,
						data.weeklyCompletion.Fri,
						data.weeklyCompletion.Sat,
					],
				},
			],
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,

			plugins: {
				legend: {
					labels: {
						color: textColor,
					},
				},
			},

			scales: {
				x: {
					ticks: {
						color: textColor,
					},

					grid: {
						color: gridColor,
					},
				},

				y: {
					ticks: {
						color: textColor,
					},

					grid: {
						color: gridColor,
					},
				},
			},
		},
	});
}

function destroyCharts() {
	if (statusChartInstance) {
		statusChartInstance.destroy();
	}

	if (categoryChartInstance) {
		categoryChartInstance.destroy();
	}

	if (weeklyChartInstance) {
		weeklyChartInstance.destroy();
	}
}

function renderAnalytics(data) {
	createStatusChart(data);

	createCategoryChart(data);

	createWeeklyChart(data);
}
