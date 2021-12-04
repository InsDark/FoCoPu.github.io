document.addEventListener("DOMContentLoaded", function(){
    let getTIme = setInterval(clock, 2000)
    clock()
    getQuote()
    currentTodo()
})

const clock = () => {
    let newDate = new Date()
    let currentHour = newDate.getHours()
    let currenMinute = newDate.getMinutes()
    let minute;
    (currenMinute.length === 1) ? minute = currenMinute : minute = `0${currenMinute}` 
    
    let currentTime = document.querySelector('.clock')
    currentTime.innerHTML = `${currentHour}:${minute}`
}

const getQuote = () => {
    let quote = document.querySelector('.quote')

    fetch('https://quotes.rest/qod')
    .then(response => response.json())
    .then(data => {
        const authorQuoute = data.contents.quotes[0].author
        const getQuote = data.contents.quotes[0].quote

        quote.innerHTML = `<h4>${authorQuoute}</h4>
                            <p>${getQuote}</p>`
    })
}

const currentTodo = () => {
    const todoContainer = document.querySelector('.tasks-container h4')
    const todoList = JSON.parse(localStorage.getItem('todo-list'))  
    if(!todoList) {
        todoContainer.innerHTML = `You have ${0} tasks to complete`
    } else{
        todoContainer.innerHTML = `You have ${todoList.length} tasks to complete`
    }
}