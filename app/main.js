document.addEventListener("DOMContentLoaded", function(){
    let getTIme = setInterval(clock, 2000)
    clock()
    getQuote()
})

const clock = () => {
    let newDate = new Date()
    let currentHour = newDate.getHours()
    let currenMinute = newDate.getMinutes()
    let currentTime = document.querySelector('.clock')
    currentTime.innerHTML = `${currentHour}:${currenMinute}`
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