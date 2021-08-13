class FORM {
    constructor (title, id) {
        this.title = title;
        this.id = id;
    }
    
    getTodo () {
        let todoForm = document.querySelector('#todo-form')   
        let lastId = JSON.parse(localStorage.getItem('todoList'))
        let id = lastId[lastId.length -1].id
        todoForm.addEventListener('submit', e => {
            e.preventDefault();
            id++;
            let todoValue = document.querySelector('.todo-title').value;
            if (!todoValue.trim()) {
                return this.errorTodo('TITLE CAN NOT BE BLANK NULL OR EMPTY');
            }
            todoForm.reset();

            const todo = new FORM(todoValue, id);
            this.printTodo(todo);
            allTodos.push(todo);
            localStorage.setItem('todoList', JSON.stringify(allTodos));
        })
    }

    errorTodo (msg)  {
        let error = document.createElement('div');
        error.innerHTML = msg;
        let todoForm = document.querySelector('#todo-form');
        todoForm.appendChild(error);
        setTimeout (() => {
            error.remove()
        }, 2000);
    }

    printTodo (todo) {
        let todoItem = document.createElement('div')

        todoItem.classList.add('todo-item')
        todoItem.innerHTML = `
                                <h4 value='${todo.id}'>${todo.title}</h4>
                                <div>
                                    <i class='fa fa-edit'></i>
                                    <i class='fas fa-trash'></i>
                                </div>`
        
        let todoList = document.querySelector('.todo-list')
        todoList.insertBefore(todoItem, todoList.children[0])

    }

    removeTodo () {
        let todosContainer = document.querySelector('.todo-list')
        todosContainer.addEventListener('click', e => {
            e.stopPropagation()
            let elementId = e.target.parentElement.parentElement.children[0].getAttribute('value')
            if (e.target.classList.contains('fa-trash')) {
                e.target.parentElement.parentElement.remove()
                allTodos.forEach(todo => {
                    if (todo.id === parseInt(elementId)) {
                        let i = allTodos.indexOf(todo)
                        allTodos.splice(i, 1)
                        localStorage.setItem('todoList', JSON.stringify(allTodos));
                    }
                })
            }
        })
    }

    renderTodoList() {
        let todoList = JSON.parse(localStorage.getItem('todoList'))
        if (!todoList) {
            return false
        }
        todoList.forEach(todo => this.printTodo(todo))
    }

    getAllTodos() {
        let todoList = JSON.parse(localStorage.getItem('todoList'))

        if (!todoList || todoList.length === 0) {
            let defaultTodo = {
                title: 'Default Sample TODO Item',
                id: 0
            }
            allTodos.push(defaultTodo)
            localStorage.setItem('todoList', JSON.stringify(allTodos))
            return this.printTodo(defaultTodo)
        }
        todoList.forEach(todo => allTodos.push(todo))
    }
}

let allTodos = []

document.addEventListener('DOMContentLoaded', () => {
    const view = new FORM()
    view.renderTodoList()
    view.getAllTodos()
    view.getTodo()
    view.removeTodo()
})