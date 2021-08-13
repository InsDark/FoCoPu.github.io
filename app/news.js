const form = document.querySelector('#filter-form')

form.addEventListener('submit',(e) => {

    e.preventDefault()

    let topic = document.querySelector('.topic-value').value
    let lang = document.querySelector('.language-value').value
    
    printNews(topic, lang)
    form.reset()
})

const printNews = (topic, lang = 'en') => {
    fetch(`https://newscatcher.p.rapidapi.com/v1/search?q=${topic}&lang=${lang}&sort_by=relevancy&page=1&media=True`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "42f9f0d4cfmsh41f38bd0b9c3cddp183322jsnbf52e97e9421",
            "x-rapidapi-host": "newscatcher.p.rapidapi.com"
        }
    })
    .then(response => response.json())
    .then(data => {
        let articles = data.articles
        articles.forEach(article => {

            let newsContainer = document.querySelector('#articles-list')
            let newNews = document.createElement('article')
            newNews.innerHTML = `<a href="${article.link}" target="_blank">${article.title}</a><p>${article.summary}</p>`
            newsContainer.insertBefore(newNews, newsContainer.children[0])
            
        } )
    })
    .catch(err => {
        console.error(err);
    });
}

let clearNews = document.querySelector('.clear-articles')
clearNews.addEventListener('click', () =>{
    let newsContainer = document.querySelector('#articles-list')
    newsContainer.innerHTML = ''
})