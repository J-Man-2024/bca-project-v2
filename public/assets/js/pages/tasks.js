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

const searchInput = document.getElementById("search-input");
const statusFilter = document.getElementById("status-filter");
const categoryFilter = document.getElementById("category-filter");
const priorityFilter = document.getElementById("priority-filter");
const sortFilter = document.getElementById("sort-filter");

const prevBtn = document.getElementById("prev-page-btn");
const nextBtn = document.getElementById("next-page-btn");
const pageInfo = document.getElementById("current-page");

let editingTaskId = null;

let allTasks = [];

let currentSearch = "";

let currentStatus = "";
let currentCategory = "";
let currentPriority = "";

let currentSortBy = "";
let currentOrder = "";

let currentPage = 1;
const limit = 10;
let totalPages = 1;

searchInput.addEventListener("input", handleSearch);
statusFilter.addEventListener("change", handleFilters);
categoryFilter.addEventListener("change", handleFilters);
priorityFilter.addEventListener("change", handleFilters);
sortFilter.addEventListener("change", handleSort);

prevBtn.addEventListener("click", goToPreviousPage);
nextBtn.addEventListener("click", goToNextPage);

async function loadTasks() {
	try {
		const data = await getTasks({
			search: currentSearch,
			status: currentStatus,
			category: currentCategory,
			priority: currentPriority,
			sortBy: currentSortBy,
			order: currentOrder,
			page: currentPage,
			limit,
		});

		allTasks = data.tasks;
		totalPages = data.totalPages;

		renderTasks(allTasks);
		updatePagination();
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

	if (e.target.classList.contains("status-btn")) {
		const taskId = e.target.dataset.id;
		const currentStatus = e.target.dataset.status;

		const newStatus = currentStatus === "Pending" ? "Completed" : "Pending";

		try {
			await updateTask(taskId, {
				status: newStatus,
			});

			await loadTasks();
		} catch (error) {
			console.error(error);
		}
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

function handleSearch() {
	currentSearch = searchInput.value.trim();
	currentPage = 1;
	loadTasks();
}

function handleFilters() {
	currentStatus = statusFilter.value;
	currentCategory = categoryFilter.value;
	currentPriority = priorityFilter.value;
	currentPage = 1;
	loadTasks();
}

function handleSort() {
	const value = sortFilter.value;

	if (!value) {
		currentSortBy = "";
		currentOrder = "";
	} else {
		[currentSortBy, currentOrder] = value.split("-");
	}
	currentPage = 1;
	loadTasks();
}

function updatePagination() {
	pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

	prevBtn.disabled = currentPage === 1;

	nextBtn.disabled = currentPage === totalPages;
}

function goToPreviousPage() {
	if (currentPage > 1) {
		currentPage--;
		loadTasks();
	}
}

function goToNextPage() {
	if (currentPage < totalPages) {
		currentPage++;
		loadTasks();
	}
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

					<button 
						class="
							btn 
							btn-primary 
							status-btn
						"
						data-id="${task._id}"
						data-status="${task.status}"
					>
						${task.status === "Pending" ? "Complete" : "Undo"}
					</button>
                </div>
            </div>
        `;
	}
}

loadTasks();
