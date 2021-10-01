const form = document.querySelector('#main-form')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    let countryData = document.querySelector('.getData').value
    if(countryData.trim() === '' || countryData.trim() === null){
        return console.error('Please write a proper country name')
    }
    form.reset()
    fetchCases(countryData.trim())

    let currentChart = document.querySelector('#myChart')
    currentChart.remove()
    let graphContainer = document.querySelector('.cases-graph')
    graphContainer.innerHTML = `<canvas id="myChart"></canvas>`
})

const fetchCases = (value) => {
    let url = `https://covid-19-data.p.rapidapi.com/country?name=${value}`
    fetch(url, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "42f9f0d4cfmsh41f38bd0b9c3cddp183322jsnbf52e97e9421",
		"x-rapidapi-host": "covid-19-data.p.rapidapi.com"
	}
    })
    .then(response => response.json())
    .then(mainData => {
        let countryName = document.querySelector('.country-name')
        countryName.innerHTML = mainData[0].country

        let countryImg = document.querySelector('.country-img')
        countryImg.setAttribute('src', `https://flagcdn.com/${mainData[0].code.toLowerCase()}.svg`)
        
        renderGraph(mainData[0])
    })
    .catch(err => {
        showError('Please enter a correct country name')
    });
}

const renderGraph = (newData) => {
    const labels = [
        'Confirmed',
        'Deaths',
        'Critical'
      ];
      const data = {
        labels: labels,
        datasets: [{
          label: `${newData.country} Data` ,
          backgroundColor: 'rgb(1, 153, 254)',
          borderColor: '#192229',
          color: 'rgb(1, 153, 254)',
          data: [`${newData.confirmed}`, `${newData.deaths}`, `${newData.recovered}`],
        }]
      };
    
      const config = {
        type: 'bar',
        data,
        options: {}
      };
    
      let myChart = new Chart(
        document.getElementById('myChart'),
        config
      );
}

const showError = (msg) => {
    let errorMsg = document.createElement('div');
    errorMsg.classList.add('error-msg')
    errorMsg.innerHTML = `<h4>${msg}</h4>`;

    let errorContainer = document.querySelector('#main-form')
    errorContainer.appendChild(errorMsg)
    setTimeout(() => {
        errorContainer.removeChild(errorMsg)
    }, 1400)
}
fetchCases('Peru')