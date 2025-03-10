const openweathermaps_key = "30c8879b0cdf2bb6b3da62fea7e94345"

function searchWeather(lat, long) {
    let lat = document.getElementById('paw-form-lat').value;
    let lon = document.getElementById('paw-form-lon').value;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var weatherObject = JSON.parse(xhttp.response);
            var currentWeather = weatherObject["weather"][0]["description"];
            document.getElementById("paw-results-row").style.display = "block";
            document.getElementById("Results").innerHTML = currentWeather;
        }
    }

    xhttp.open("GET", `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${openweathermaps_key}`, true);
    xhttp.setRequestHeader('Accept', 'application/json');
    xhttp.send();
}

function getAirPollution(){
    let lat = document.getElementById('paw-form-lat').value;
    let lon = document.getElementById('paw-form-lon').value;
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let airPollution = JSON.parse(this.responseText);
            let aqi = airPollution.list[0].main.aqi; // Índice de qualidade do ar (AQI)
            let pollutionText = "";

            switch (aqi) {
                case 1: pollutionText = "Boa"; break;
                case 2: pollutionText = "Razoável"; break;
                case 3: pollutionText = "Moderada"; break;
                case 4: pollutionText = "Má"; break;
                case 5: pollutionText = "Muito má"; break;
                default: pollutionText = "Desconhecida";
            }

            document.getElementById("ResultAirPollution").innerHTML = `Qualidade do ar: ${pollutionText} (AQI: ${aqi})`;
        }
    };

    xhttp.open("GET", `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${openweathermaps_key}`, true);
    xhttp.setRequestHeader('Accept', 'application/json');
    xhttp.send();
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("obterLocalizacao").addEventListener("click", function() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                function(posicao) {
                    document.getElementById("paw-form-lat").value = posicao.coords.latitude.toFixed(4);
                    document.getElementById("paw-form-lon").value = posicao.coords.longitude.toFixed(4);
                },
                function() {
                    alert("Erro ao obter localização!");
                }
            );
        } else {
            alert("Geolocalização não suportada pelo navegador.");
        }
    });
});
