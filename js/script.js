
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

let totalTodo = document.querySelector("#totalTodo");
let todoCompleted = document.querySelector("#todoCompleted");
let todoPending = document.querySelector("#todoPending");
const todo_container = document.querySelector(".todo_container");
const todo_components = document.querySelector(".todo_components");

const add_todo = document.querySelector("#add_todo");
const input_container = document.querySelector(".input_container");
const saveBtn = document.querySelector("#saveBtn");
const cancelBtn = document.querySelectorAll(".cancelBtn");
const inputData = document.querySelector("#input");

const successPrompt = document.querySelector(".success-prompt");
const dateContainer = document.querySelector('#date-container')

let todoArr = [];
let successfulTodos;
const date = new Date();

add_todo.addEventListener("click", () => {
	input_container.classList.add("input_container_show");
});

saveBtn.addEventListener("click", savesTodo);

document.addEventListener(
	"keydown",
	(event) => {
		if (event.key == "Enter") {
			savesTodo();
			inputData.value = "";
		}
	},
	false
);

cancelBtn.forEach((btn) => {
	btn.addEventListener("click", () => {
		input_container.classList.remove("input_container_show");
	});
});

function displayTodos() {
	localStorage.hasOwnProperty("data") == true
		? (todoArr = JSON.parse(localStorage.getItem("data")))
		: (todoArr = []);
	todo_container.innerHTML = "";
	todoArr.forEach((todos, index) => {
		todo_container.innerHTML += `<div class="todo_components">
							<i onclick='checkTodo(${index})'>
								<p class='check'></p>
							</i>
						<div class="todo_text">
							<p class='todoP'>${todos.todo}</p>
							<span>${todos.dateCreated}</span>
							<div class='edit-todo-container'></div>
						</div>
						<div class="todo_buttons">
							<button onclick='editTodo(${index})' class="fas fa-pencil-alt edit"></button>
							<button onclick='deletesTodo(${index})' class="fas fa-trash-alt trash"></button>
						</div>
					</div>`;
		completedTodos(index);
	});
}

displayTodos();

function savesTodo() {
	if (inputData.value) {

		const day = date.getDate();
		const month = date.toLocaleString('default', {month: 'short'});
		const year = date.getFullYear();
		const minutes = date.getMinutes();
		const hours = date.getHours();
		let dateCreated = `${month} ${day}, ${year} - ${hours} : ${minutes}`;
		let todoObj = {
			todo: inputData.value,
			dateCreated: dateCreated,
			isCompleted: false,
		};
		todoArr.unshift(todoObj);
		savesOnStorage();
		input_container.classList.remove("input_container_show");
		inputData.value = "";
		// completedTodos()
		displayTodos();
		details();
		togglePrompt();
	}
}

function deletesTodo(value) {
	const todoComponent = document.querySelectorAll('.todo_components')
	todoComponent[value].classList.add('fall')

	todoComponent[value].addEventListener('animationend', () => {
		todoArr.splice(value, 1);
		savesOnStorage();
		displayTodos();
		details();
	})
}

function editTodo(value) {

	const todo_text = document.querySelectorAll(".todo_text");
	const editTodoContainer = document.querySelectorAll('.edit-todo-container')
	editTodoContainer[value].innerHTML = `
									<input type="text" name="" id='edit-input${value}'>
									<button id='edit-btn${value}'>Update</button>
		`;
	const editInput = document.querySelector(`#edit-input${value}`)
	editInput.value = todoArr[value].todo

	const editBtn = document.querySelector(`#edit-btn${value}`).addEventListener('click', () => {
		todoArr[value].todo = editInput.value
		savesOnStorage()
		displayTodos()
	})
}

function savesOnStorage() {
	localStorage.setItem("data", JSON.stringify(todoArr));
}

function details() {
	if (todoArr.length > 1) {
		totalTodo.innerText = `${todoArr.length} Todos`;
	} else {
		totalTodo.innerText = `${todoArr.length} Todo`;
	}
}
details();

function completedTodos(index) {
	let todoP = document.querySelectorAll(".todoP");
	const check = document.querySelectorAll('.check')
	if (todoArr[index].isCompleted == true) {
		todoP[index].classList.add("todo_success");
		check[index].classList.add('fas', 'fa-check-square')
	} else {
		todoP[index].classList.remove("todo_success");
		check[index].classList.remove('fas', 'fa-check-square')
	}

	successfulTodos = todoArr.filter((todo) => todo.isCompleted == true);
	todoCompleted.innerText = `${successfulTodos.length} Done`;
	todoPending.innerText = `${todoArr.length - successfulTodos.length} To go`;
}

function checkTodo(value) {
	if (todoArr[value].isCompleted == false) {
		todoArr[value].isCompleted = true;
	} else {
		todoArr[value].isCompleted = false;
	}

	savesOnStorage();
	completedTodos(value);
}

function togglePrompt() {
	successPrompt.classList.add("success-prompt-show");
	setTimeout(() => {
		successPrompt.classList.remove("success-prompt-show");
	}, 3000);
}

setInterval(() => {
	let day = date.getDay()
	let dayString = days[day]
	let month = date.toLocaleString('default', {month: 'long'})
	let year = date.getFullYear()
	let dateDescription = `${month} ${date.getDate()}, ${year}`
	dateContainer.innerHTML = 
	`	<span>${dateDescription}</span>
			<p>${dayString}</p>
	`
})