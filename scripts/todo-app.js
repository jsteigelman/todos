
'use strict'

let todos = getSavedTodos()

const filters = {
    searchText: '',
    hideCompleted: false
}

renderTodos(todos, filters)

// Listen for input text change and apply filter
document.querySelector('#input-text').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})

// Add new todos from user input
document.querySelector('#create-todo-form').addEventListener('submit', (e) => {
    
    e.preventDefault()
    const userInput = e.target.elements.formInput.value.trim()
   
    // exit program if new todo is empty
    if (userInput.length === 0) {
        return
    }

    todos.push({
        id: uuidv4(),
        text: userInput, 
        completed: false})
    saveTodos(todos)
    renderTodos(todos, filters)
    e.target.elements.formInput.value = ''
})

// Listen for hidecCompleted checkbox 
document.querySelector('#hide-completed').addEventListener('change', (e) => {
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters)
})
