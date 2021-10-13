const form = document.querySelector('#filter-form')

form.addEventListener('submit',(e) => {

    e.preventDefault()

    let topic = document.querySelector('.topic-value').value
    
    getNews(topic)
    form.reset()
})

class ARTICLE {
    constructor (title, link, summary, id, status) {
        this.title = title,
        this.link = link,
        this.summary = summary,
        this._id = id
        this.status = status
    }
}

const getNews = (topic) => {
    fetch(`https://newscatcher.p.rapidapi.com/v1/search?q=${topic}&lang=en&sort_by=relevancy&sources=bbc.com,cbsnews.com,theguardian.com,nytimes.com,cnn.com,wsj.com&page=1&media=True`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "newscatcher.p.rapidapi.com",
		"x-rapidapi-key": "42f9f0d4cfmsh41f38bd0b9c3cddp183322jsnbf52e97e9421"
	}
    })
    .then(response => response.json())
    .then(data => {
        let articles = data.articles
        articles.forEach(article => printNews(article));
        console.log(data)
    })
    .catch(err => {
        console.error(err);
    });
}

const pinedNews = []

const printNews =  (article) => {
    if (!article.status) {
        article.status = false
    }
    if (!article.summary) {
        return false
    }
    console.log(article.media)
    let newsContainer = document.querySelector('#articles-list')
    let newNews = document.createElement('article')
    newNews.setAttribute('value', article._id)
    newNews.innerHTML = `<div class='header'>
                            <a href="${article.link}" target="_blank">${article.title}</a>
                            <i class='fa fa-thumbtack ${article.status}'></i>
                        </div>
                        <div class='content'>
                            <img class='news-media' src='${article.media}' alt='news-img'>
                            <p>${article.summary}</p>
                        </div>`
    newsContainer.insertBefore(newNews, newsContainer.children[0])

    const newArticle = new ARTICLE(article.title, article.link, article.summary, article._id, article.status)
    pinedNews.push(newArticle)

} 

const clearNews = document.querySelector('.clear-articles')
const newsContainer = document.querySelector('#articles-list')

clearNews.addEventListener('click', () =>{
    newsContainer.innerHTML = ''
})

newsContainer.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('fa-thumbtack')){
        e.target.classList.toggle('false')
        e.target.classList.toggle('true')
        
        const news = e.target.parentElement.parentElement
        const newsLink = news.getAttribute('value')
        
        pinedNews.forEach(article => {
            if (article._id === newsLink) {
                let changed = !article.status
                article.status = changed
            }
        })
        
        const found = pinedNews.filter(article => {
            return article.status === true
        })

        localStorage.setItem('pinedNews', JSON.stringify(found))
    }
})

const renderPinnedArticles = () => {
    let pinnedArticles = JSON.parse(localStorage.getItem('pinedNews'))
    if (!pinnedArticles) {
        return false
    }

    pinnedArticles.forEach(article => {
        printNews(article)
    })

} 

renderPinnedArticles()