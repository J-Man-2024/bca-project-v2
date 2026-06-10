import { API_BASE_URL } from "../config/api.js";
import { getToken } from "../utils/storage.js";

export async function getDashboardStats() {
	const token = getToken();

	const response = await fetch(`${API_BASE_URL}/dashboard/stats`, {
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
