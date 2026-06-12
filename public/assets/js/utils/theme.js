export function initializeTheme() {
	const savedTheme = localStorage.getItem("theme");

	if (savedTheme) {
		document.documentElement.setAttribute("data-theme", savedTheme);
	}
	updateThemeIcon();
}

export function toggleTheme() {
	const currentTheme = document.documentElement.getAttribute("data-theme");

	const newTheme = currentTheme === "dark" ? "light" : "dark";

	document.documentElement.setAttribute("data-theme", newTheme);

	localStorage.setItem("theme", newTheme);
	updateThemeIcon();
}

function updateThemeIcon() {
	const themeToggle = document.getElementById("theme-toggle");

	if (!themeToggle) {
		return;
	}

	const currentTheme = document.documentElement.getAttribute("data-theme");

	themeToggle.textContent = currentTheme === "dark" ? "☀️" : "🌙";
}
