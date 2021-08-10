const dataForm  = document.querySelector('#search-form')
dataForm.addEventListener('submit', e => {
    e.preventDefault()

    let countryInput = document.querySelector('.country-input');
    let coutryLetter = countryInput.value.toLowerCase()
    
    let newLetter = coutryLetter.split('')
    
    let letter = newLetter[0].toUpperCase()
    newLetter.shift()
    
    newLetter.forEach(item => {
        letter += item
        return letter

    })

    getData(letter)

    dataForm.reset()
})

const getData = (country = 'Peru') => {
    const url = `https://covid-api.mmediagroup.fr/v1/cases?country=${country}`;
        fetch (url) 
            .then(response => response.json())
            .then(data => {
                let countryList = document.querySelector('.countries-list')
                let dataCountry = data.All

                let div = document.createElement('div');
                div.classList.add('country-list');

                div.innerHTML = `
                        <h3 class="country-name">${dataCountry.country}</h3>
                        <h3 class="country-population">${dataCountry.population}</hh3>
                        <h3 class="country-confirmed">${dataCountry.confirmed}</hh3>
                        <h3 class='country-deaths'>${dataCountry.deaths}</h3>
                        <h3 class='country-location'>${dataCountry.location}</h3>
                        `
                countryList.appendChild(div)
                console.log(data)
            })
            .catch(err => {
                console.log(err);
            })
}

getData()