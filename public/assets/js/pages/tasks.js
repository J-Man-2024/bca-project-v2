import { checkAuth, logout } from "../utils/auth.js";
import {
	getTasks,
	createTask,
	deleteTask,
	updateTask,
} from "../services/taskService.js";

checkAuth();

const logoutBtn = document.getElementById("logout-btn");
const taskList = document.getElementById("task-list");
const createTaskBtn = document.getElementById("create-task-btn");
const taskModal = document.getElementById("task-modal");
const cancelBtn = document.getElementById("cancel-btn");

const taskForm = document.getElementById("tasks-form");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const categoryInput = document.getElementById("category");
const priorityInput = document.getElementById("priority");

const modalTitle = document.getElementById("modal-title");
const submitBtn = document.getElementById("submit-btn");

logoutBtn.addEventListener("click", logout);
createTaskBtn.addEventListener("click", openModal);
cancelBtn.addEventListener("click", closeModal);
taskModal.addEventListener("click", outsideClose);
taskForm.addEventListener("submit", handleCreateTask);
taskList.addEventListener("click", handleTaskActions);

let editingTaskId = null;

let allTasks = [];

async function loadTasks() {
	try {
		const data = await getTasks();

		allTasks = data.tasks;

		renderTasks(allTasks);
	} catch (error) {
		console.error(error);
	}
}

async function handleCreateTask(e) {
	e.preventDefault();

	const taskData = {
		title: titleInput.value.trim(),
		description: descriptionInput.value.trim(),
		category: categoryInput.value,
		priority: priorityInput.value,
	};

	try {
		if (editingTaskId) {
			await updateTask(editingTaskId, taskData);
		} else {
			await createTask(taskData);
		}

		closeModal();
		taskForm.reset();
		await loadTasks();
	} catch (error) {
		console.error(error);
	}
}

async function handleTaskActions(e) {
	if (e.target.classList.contains("delete-btn")) {
		const taskId = e.target.dataset.id;
		const confirmed = confirm("Are you sure you want to delete this task?");

		if (!confirmed) {
			return;
		}
		try {
			await deleteTask(taskId);
			loadTasks();
		} catch (error) {
			console.error(error);
		}
	}

	if (e.target.classList.contains("edit-btn")) {
		const taskId = e.target.dataset.id;

		const task = allTasks.find((task) => task._id === taskId);

		if (!task) return;

		editingTaskId = task._id;

		titleInput.value = task.title;

		descriptionInput.value = task.description;

		categoryInput.value = task.category;

		priorityInput.value = task.priority;

		modalTitle.textContent = "Edit Task";

		submitBtn.textContent = "Update";

		taskModal.classList.remove("hidden");
	}
}

function openModal() {
	taskForm.reset();

	editingTaskId = null;

	modalTitle.textContent = "Create Task";

	submitBtn.textContent = "Create";

	taskModal.classList.remove("hidden");
}

function outsideClose(e) {
	if (e.target === taskModal) {
		closeModal();
	}
}

function closeModal() {
	taskModal.classList.add("hidden");

	editingTaskId = null;
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
                    class="btn btn-primary edit-btn"
                    data-id="${task._id}"
                    >
                        Edit
                    </button>

                    <button 
                    class="btn btn-primary delete-btn" 
                    data-id="${task._id}"
                    >
                        Delete
                    </button>
                </div>
            </div>
        `;
	}
}

loadTasks();
