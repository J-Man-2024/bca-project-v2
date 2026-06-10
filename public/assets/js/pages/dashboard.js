import { checkAuth, logout } from "../utils/auth.js";

checkAuth();

const logoutBtn = document.getElementById("logout-btn");

logoutBtn.addEventListener("click", logout);
