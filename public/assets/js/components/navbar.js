export function renderNavbar() {
	const navbarContainer = document.getElementById("navbar-container");

	const currentPage = window.location.pathname;

	const dashboardActive = currentPage.includes("dashboard.html")
		? "active-nav"
		: "";

	const tasksActive = currentPage.includes("tasks.html") ? "active-nav" : "";

	const analyticsActive = currentPage.includes("analytics.html")
		? "active-nav"
		: "";

	navbarContainer.innerHTML = `
		<header class="dashboard-header">

			<div class="top-header">

				<h1>
					Task Management System
				</h1>
				<div class="header-actions">

						<button
							id="theme-toggle"
							class="btn"
						>
							🌙
						</button>

						<button
							id="logout-btn"
							class="btn btn-primary"
						>
							Logout
						</button>

				</div>

			</div>

			<nav class="nav-links">

				<a class="${dashboardActive}" href="/pages/dashboard.html">
					Dashboard
				</a>

				<a class="${tasksActive}" href="/pages/tasks.html">
					Tasks
				</a>

				<a class="${analyticsActive}" href="/pages/analytics.html">
					Analytics
				</a>

			</nav>

		</header>
	`;
}
