import { API_BASE_URL } from "../config/api.js";
import { getToken } from "../utils/storage.js";

export async function getTasks(queryParams = {}) {
	const token = getToken();

	const queryString = new URLSearchParams(queryParams).toString();

	const response = await fetch(`${API_BASE_URL}/tasks?${queryString}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
}

export async function createTask(taskData) {
	const token = getToken();

	const response = await fetch(`${API_BASE_URL}/tasks`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},

		body: JSON.stringify(taskData),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
}

export async function deleteTask(taskId) {
	const token = getToken();

	const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
}

export async function updateTask(taskId, taskData) {
	const token = getToken();

	const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
		method: "PUT",

		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(taskData),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
}
