import { getToken } from "../utils/storage.js";
import { API_BASE_URL } from "../config/api.js";

const token = getToken();

if (token) {
	window.location.href = "/pages/dashboard.html";
} else {
	window.location.href = "./pages/login.html";
}
