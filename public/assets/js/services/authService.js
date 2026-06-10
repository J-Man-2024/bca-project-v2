import { API_BASE_URL } from "../config/api.js";

export async function registerUser(userData) {
	const response = await fetch(`${API_BASE_URL}/auth/register`, {
		method: "POST",

		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userData),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
}

export async function loginUser(credentials) {
	const response = await fetch(`${API_BASE_URL}/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentials),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
}
