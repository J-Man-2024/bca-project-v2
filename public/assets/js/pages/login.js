import { loginUser } from "../services/authService.js";
import { saveToken } from "../utils/storage.js";

const loginForm = document.getElementById("login-form");

const emailInput = document.getElementById("email");

const passwordInput = document.getElementById("password");

const errorMessage = document.getElementById("error-message");

const loginBtn = document.getElementById("login-btn");

loginForm.addEventListener("submit", handleLogin);

async function handleLogin(e) {
	e.preventDefault();

	// Clear any old error messages
	errorMessage.style.display = "none";
	errorMessage.textContent = "";

	// disable button for repeated clicks
	loginBtn.disabled = true;
	loginBtn.textContent = "Logging in...";

	// Read and store input values
	const credentials = {
		email: emailInput.value.trim(),
		password: passwordInput.value.trim(),
	};

	try {
		const data = await loginUser(credentials);
		saveToken(data.token);
		window.location.href = "/pages/dashboard.html";
	} catch (error) {
		errorMessage.textContent = error.message;
		errorMessage.style.display = "block";
	} finally {
		loginBtn.disabled = false;
		loginBtn.textContent = "Login";
	}
}
