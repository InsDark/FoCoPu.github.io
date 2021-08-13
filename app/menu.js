document.addEventListener("DOMContentLoaded", function(){

        let menuBars = document.querySelector('.nav-axis');
        let spans = document.querySelectorAll('span')
        
        menuBars.addEventListener('click', () => {
            spans.forEach((span) =>{
                span.classList.toggle('active')
            })
        })
})
