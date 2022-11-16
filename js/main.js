var $random = document.querySelector('#random');
var $homePage = document.querySelector('.home-page');
var $parkDetail = document.querySelector('.park-detail');
var $overlay = document.querySelector('.overlay-transparent');

var $parkName = document.querySelector('#park-name');
var $parkImages1 = document.querySelector('#park-images1');
var $parkDescription = document.querySelector('#park-description');
var $parkWeatherInfo = document.querySelector('#park-weatherinfo');

function getRandomPark(event) {
  $homePage.className = 'home-page hidden';
  $parkDetail.className = 'park-detail';
  $overlay.className = 'overlay-solid';
  getParkData();
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getParkData() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://developer.nps.gov/api/v1/parks?limit=468&api_key=zfq2cSth1H6ynVcxdUiCUfdUdsTPyW6nusqU7OFY');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var i = getRandomInt(468);
    $parkName.textContent = xhr.response.data[i].fullName;
    $parkImages1.setAttribute('src', xhr.response.data[i].images[0].url);
    $parkImages1.setAttribute('alt', xhr.response.data[i].images[0].altText);
    $parkDescription.textContent = xhr.response.data[i].description;
    $parkWeatherInfo.textContent = xhr.response.data[i].weatherInfo;
  });
  xhr.send();
}

$random.addEventListener('click', getRandomPark);

// xhr.response.data[i].fullName
// xhr.response.data[i].images[0].url
// xhr.response.data[i].description
// xhr.response.data[i].weatherInfo
