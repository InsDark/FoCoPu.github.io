class TODO {
    constructor (title, id) {
        this.title = title;
        this.id = id;
    }
    
    getTodo () {
        let todoForm = document.querySelector('#todo-form')   
        todoForm.addEventListener('submit', e => {
            e.preventDefault();
            const id = new Date().getTime()
            const todoValue = document.querySelector('.todo-title').value;
            if (!todoValue.trim()) {
                return this.errorTodo('TITLE CAN NOT BE BLANK NULL OR EMPTY');
            }
            todoForm.reset();

            const todo = new TODO(todoValue, id);
            this.printTodo(todo);
            TODO_LIST.push(todo)
            localStorage.setItem(TODO_LIST_CLASS, JSON.stringify(TODO_LIST));
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

    printTodo (todo, classList = `.${TODO_LIST_CLASS}` ) {
        let todoItem = document.createElement('div')

        todoItem.classList.add('todo-item')
        todoItem.setAttribute('draggable', true)
        todoItem.innerHTML = `
                                <h4 value='${todo.id}'>${todo.title}</h4>
                                <i class='fas fa-trash'></i>`
    
        let todoList = document.querySelector(classList)
        todoList.insertBefore(todoItem, todoList.children[0])

    }

    removeTodo () {
        let todosContainer = document.querySelector('.todo-sections')
        todosContainer.addEventListener('click', e => {
            e.stopPropagation()
            let elementId = e.target.parentElement.children[0].getAttribute('value')
            if (e.target.classList.contains('fa-trash')) {
                if (e.target.parentElement.parentElement.classList.contains('todo-list')) {
                    e.target.parentElement.remove()
                    TODO_LIST.forEach(todo => {
                        if (parseInt(todo.id) === parseInt(elementId)) {
                            let i = TODO_LIST.indexOf(todo)
                            TODO_LIST.splice(i, 1)
                            localStorage.setItem('todo-list', JSON.stringify(TODO_LIST));
                        }
                    })  
                } else if (e.target.parentElement.parentElement.classList.contains('doing-list')) {
                    e.target.parentElement.remove()
                    DOING_LIST.forEach(todo => {
                        if (parseInt(todo.id) === parseInt(elementId)) {
                            let i = DOING_LIST.indexOf(todo)
                            DOING_LIST.splice(i, 1)
                            localStorage.setItem('doing-list', JSON.stringify(DOING_LIST));
                        }
                    })
                    
                } else {
                    e.target.parentElement.remove()
                    DONE_LIST.forEach(todo => {
                        if (parseInt(todo.id) === parseInt(elementId)) {
                            let i = DONE_LIST.indexOf(todo)
                            DONE_LIST.splice(i, 1)
                            localStorage.setItem('done-list', JSON.stringify(DONE_LIST));
                        }
                    })
                    
                }
            }
        })
    }

    renderTodoList() {
        this.removeTodo()
        this.draggableTodos()

        const todoList = JSON.parse(localStorage.getItem(TODO_LIST_CLASS));
        if (!todoList){
            return null
        } else {
            todoList.forEach(todo => this.printTodo(todo, `.${TODO_LIST_CLASS}`))
            todoList.forEach(todo => {TODO_LIST.push(todo)})
        }

        const doingList = JSON.parse(localStorage.getItem(DOING_LIST_CLASS));
        if (!doingList){
            return null
        } else {
            doingList.forEach(todo => this.printTodo(todo, `.${DOING_LIST_CLASS}`))
            doingList.forEach(todo => DOING_LIST.push(todo))
        }
    
        const doneList = JSON.parse(localStorage.getItem(DONE_LIST_CLASS));
        if (!doneList){
            return null
        } else {
            doneList.forEach(todo => this.printTodo(todo, `.${DONE_LIST_CLASS}`))
            doneList.forEach(todo => DONE_LIST.push(todo))
        }
    
    }

    draggableTodos () {
        const dragzones = document.querySelectorAll('.dragzone')
        let draggedItem;

        dragzones.forEach(dragzone =>{

            dragzone.addEventListener('dragstart', e => {
                draggedItem = e.target
            })

            dragzone.addEventListener('drop', e => {
                e.preventDefault()
                e.target.style.border = 'none'
                dragzone.appendChild(draggedItem)
                filterTodo()
            })

            dragzone.addEventListener('dragenter', e => {
                if(e.target.classList.contains('dragzone')){
                    e.target.style.border = '1px solid white'
                }
            })

            dragzone.addEventListener('dragleave', e => {
                e.target.style.border = 'none'
            })

            dragzone.addEventListener('dragover', e => {
                e.preventDefault()
            })
        })
    }
}

let TODO_LIST = []
let DOING_LIST = []
let DONE_LIST = []

const TODO_LIST_CLASS = 'todo-list'
const DOING_LIST_CLASS  = 'doing-list'
const DONE_LIST_CLASS = 'done-list'

document.addEventListener('DOMContentLoaded', () => {
    const view = new TODO()
    view.renderTodoList()
    view.getTodo()
})

const filterTodo = () => {
    const todoList = document.querySelector('.todo-list').children
    TODO_LIST = []
    localStorage.setItem(TODO_LIST_CLASS, JSON.stringify(TODO_LIST))
    Array.from(todoList).forEach(todo => {
        let todoTxt = todo.children[0].textContent
        let todoId = todo.children[0].getAttribute('value')
        let newTodo = new TODO(todoTxt, todoId)
        TODO_LIST.push(newTodo)
        localStorage.setItem(TODO_LIST_CLASS, JSON.stringify(TODO_LIST))
    })


    const doingList = document.querySelector('.doing-list').children
    DOING_LIST =[]
    localStorage.setItem(DOING_LIST_CLASS, JSON.stringify(DOING_LIST))
    Array.from(doingList).forEach(todo => {
        let todoTxt = todo.children[0].textContent
        let todoId = todo.children[0].getAttribute('value')
        let newTodo = new TODO(todoTxt, todoId)
        DOING_LIST.push(newTodo)
        localStorage.setItem(DOING_LIST_CLASS, JSON.stringify(DOING_LIST))
    })



    const doneList = document.querySelector('.done-list').children
    DONE_LIST = []
    localStorage.setItem(DONE_LIST_CLASS, JSON.stringify(DONE_LIST))
    Array.from(doneList).forEach(todo => {
        let todoTxt = todo.children[0].textContent
        let todoId = todo.children[0].getAttribute('value')
        let newTodo = new TODO(todoTxt, todoId)
        DONE_LIST.push(newTodo)
        localStorage.setItem(DONE_LIST_CLASS, JSON.stringify(DONE_LIST))
    })

}