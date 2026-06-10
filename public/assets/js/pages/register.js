import { registerUser } from "../services/authService.js";

// References to Elements from Register page
const registerForm = document.getElementById("register-form");

const nameInput = document.getElementById("name");

const emailInput = document.getElementById("email");

const passwordInput = document.getElementById("password");

const errorMessage = document.getElementById("error-message");

const registerBtn = document.getElementById("register-btn");

// Listen for form submission
registerForm.addEventListener("submit", handleRegister);

// handleRegister Function
async function handleRegister(e) {
	e.preventDefault();

	// Hide previous errors
	errorMessage.style.display = "none";
	errorMessage.textContent = "";

	// Disable Button
	registerBtn.disabled = true;
	registerBtn.textContent = "Registering...";

	// Read values from inputs
	const userData = {
		name: nameInput.value.trim(),
		email: emailInput.value.trim(),
		password: passwordInput.value.trim(),
	};

	try {
		const data = await registerUser(userData);
		window.location.href = "/pages/login.html";
	} catch (error) {
		errorMessage.textContent = error.message;
		errorMessage.style.display = "block";
	} finally {
		registerBtn.disabled = false;
		registerBtn.textContent = "Register";
	}
}
