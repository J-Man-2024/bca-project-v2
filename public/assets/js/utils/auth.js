import { getToken, removeToken } from "./storage.js";

export function checkAuth() {
	const token = getToken();

	if (!token) {
		window.location.href = "/public/pages/login.html";

		return false;
	}

	return true;
}

export function logout() {
	removeToken();
	window.location.href = "/public/pages/login.html";
}
