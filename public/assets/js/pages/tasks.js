import { checkAuth, logout } from "../utils/auth.js";
import { getTasks } from "../services/taskService.js";

checkAuth();

const logoutBtn = document.getElementById("logout-btn");
const taskList = document.getElementById("task-list");
const createTaskBtn = document.getElementById("create-task-btn");
const taskModal = document.getElementById("task-modal");
const cancelBtn = document.getElementById("cancel-btn");

logoutBtn.addEventListener("click", logout);
createTaskBtn.addEventListener("click", openModal);
cancelBtn.addEventListener("click", closeModal);
taskModal.addEventListener("click", outsideClose);

async function loadTasks() {
	try {
		const data = await getTasks();

		renderTasks(data.tasks);
	} catch (error) {
		console.error(error);
	}
}

function openModal() {
	taskModal.classList.remove("hidden");
}

function outsideClose(e) {
	if (e.target === taskModal) {
		closeModal();
	}
}

function closeModal() {
	taskModal.classList.add("hidden");
}

function renderTasks(tasks) {
	taskList.innerHTML = "";

	for (const task of tasks) {
		taskList.innerHTML += `
            <div class="task-card">
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <p>Category: ${task.category}</p>

                <p>Priority: ${task.priority}</p>

                <p>Status: ${task.status}</p>

                <div class="task-actions">
                    <button 
                    class="btn btn-primary"
                    >
                        Edit
                    </button>

                    <button 
                    class="btn btn-primary"
                    >
                        Delete
                    </button>
                </div>
            </div>
        `;
	}
}

loadTasks();
