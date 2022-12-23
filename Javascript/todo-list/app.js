const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

const filterOption = document.querySelector(".filter-todo");

const addTodo = (event) => {
  // preventing form from submitting
  event.preventDefault();

  //todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //create li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //add toda to session storage
  saveTodo(todoInput.value);
  //check the mark button
  const completedButton = document.createElement("button");

  completedButton.innerHTML = '<i class="fas fa-check"></i>';

  completedButton.classList.add("complete-btn");

  todoDiv.appendChild(completedButton);

  // Check the Trash Button
  const trashButton = document.createElement("button");

  trashButton.innerHTML = '<i class="fas fa-trash"></i>';

  trashButton.classList.add("trash-btn");

  todoDiv.appendChild(trashButton);

  //append to list
  todoList.appendChild(todoDiv);
  // clear the input value
  todoInput.value = "";
};

const deleteCheck = (e) => {
  const item = e.target;
  console.log(e.target.classList);
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeTodos(todo);
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }

  // Check the Mark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
};

// localStorage.clear();

const filterTodo = (e) => {
  const todos = todoList.childNodes;

  console.log();

  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
};

function saveTodo(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //check the mark button
    const completedButton = document.createElement("button");

    completedButton.innerHTML = '<i class="fas fa-check"></i>';

    completedButton.classList.add("complete-btn");

    todoDiv.appendChild(completedButton);

    // Check the Trash Button
    const trashButton = document.createElement("button");

    trashButton.innerHTML = '<i class="fas fa-trash"></i>';

    trashButton.classList.add("trash-btn");

    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
  });
}

// remove todos from session storage
function removeTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.childNodes[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  console.log(todoIndex);
}

document.addEventListener("DOMContentLoaded", getTodos);

todoButton.addEventListener("click", addTodo);

todoList.addEventListener("click", deleteCheck);

filterOption.addEventListener("click", filterTodo);
