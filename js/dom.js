
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

	export{totalTodo, todoCompleted, todoPending, todo_container, todo_components, add_todo, input_container, saveBtn, cancelBtn, inputData, successPrompt}