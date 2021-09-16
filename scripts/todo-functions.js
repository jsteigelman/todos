'use strict'

// Fetch existing todos from localStorage
const getSavedTodos = () => {
  const todosJSON = localStorage.getItem('todos')

  try {
    return todosJSON ? JSON.parse(todosJSON) : []
  } catch (e) {
    return []
  }
}

// Save todos to localStorage
const saveTodos = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos))
}

// Remove note from array
const removeTodo = (todoId) => {
  const todoIndex = todos.findIndex((todo) => todoId === todo.id)
  
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1)
  }
}

// Toggle checkbox after it is changed
const toggleTodo = (todoId) => {
  const todoElement = todos.find((todoElement) => todoId === todoElement.id)

  if (todoElement) {
    todoElement.completed = !todoElement.completed
  }
}

// Generate DOM elements for an individual note
const generateTodoDOM = (todoEl) => {
  const divElement = document.createElement('label')
  const containerElement = document.createElement('div')
  const checkboxElement = document.createElement('input')
  const spanElement = document.createElement('span')
  const buttonElement = document.createElement('button')

  // Setup todo checkbox
  checkboxElement.setAttribute('type', 'checkbox')
  checkboxElement.checked = todoEl.completed
  containerElement.appendChild(checkboxElement)
  checkboxElement.addEventListener('click', () => {
    toggleTodo(todoEl.id)
    saveTodos(todos)
    renderTodos(todos, filters)
  })

  // Setup todo text
  spanElement.textContent = todoEl.text
  containerElement.appendChild(spanElement)

  // Setup container
  divElement.classList.add('list-item')
  containerElement.classList.add('list-item__container')
  divElement.appendChild(containerElement)

  // Setup the remove button
  buttonElement.textContent = 'remove'
  buttonElement.classList.add('button', 'button--text')
  divElement.appendChild(buttonElement)
  buttonElement.addEventListener('click', () => {
    removeTodo(todoEl.id)
    saveTodos(todos)
    renderTodos(todos, filters)
  })

  return divElement
}

// Get the DOM elements for the list summary
const generateSummaryDOM = (incompleteTodos) => {
  const message = document.createElement('h2')
  const todoWord = incompleteTodos.length === 1 ? 'todo' : 'todos'
  
  message.textContent = `You have ${incompleteTodos.length} ${todoWord} left.`
  message.classList.add('list-title')

  return message
}

// Render application todos based on filters
const renderTodos = (todos, filtersObj) => {
  const todoDiv = document.querySelector('#todo-div')

  // apply filter on todos (text match)
  let filteredTodos = todos.filter((todo) => {
    return todo.text
      .toLowerCase()
      .includes(filtersObj.searchText.toLowerCase())
  })

  // apply filter on todos (incomplete match)
  filteredTodos = filteredTodos.filter((todoElement) => {
    if (filters.hideCompleted) {
      return !todoElement.completed
    } else {
      return true
    }
  })

  // hide completed todos
  const incompleteTodos = filteredTodos.filter((todo) => {
    return !todo.completed
  })

  // remove existing results
  todoDiv.innerHTML = ''

  // show message with todo count
  const summary = generateSummaryDOM(incompleteTodos)
  todoDiv.appendChild(summary)

  // create todo elements
  if (todos.length > 0) {
    filteredTodos.forEach((todoEl) => {
      const newTodo = generateTodoDOM(todoEl)
      todoDiv.appendChild(newTodo)
    })
  } else {
    const message = document.createElement('p')
    message.classList.add('empty-message')
    message.textContent = "There are no to-dos to display."
    todoDiv.appendChild(message)
  }

}
