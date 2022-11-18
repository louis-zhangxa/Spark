var $random = document.querySelector('#random');
var $mobileSearch = document.querySelector('.mobile-search');
var $homePage = document.querySelector('.home-page');
var $parkDetail = document.querySelector('.park-detail');
var $body = document.querySelector('body');
var $backHome = document.querySelector('#home');
var $mobileSearchSubmit = document.querySelector('.position-relative-mobile');
var $desktopSearchSubmit = document.querySelector('.position-relative-desktop');
var $searchResult = document.querySelector('.park-list-row');

var $parkName = document.querySelector('#park-name');
var $parkImages1 = document.querySelector('#park-images1');
var $parkDescription = document.querySelector('#park-description');
var $parkWeatherInfo = document.querySelector('#park-weatherinfo');
var $parkState = document.querySelector('#park-state');
var $parkLink = document.querySelector('#park-link');
var $cost = document.querySelector('#cost');
var $costDescription = document.querySelector('#cost-description');
var $parkAddressLine1 = document.querySelector('#park-address-line1');
var $parkAddressLine2 = document.querySelector('#park-address-line2');
var $parkPhoneNumber = document.querySelector('#park-phone-number');
var $parkEmail = document.querySelector('#park-email');

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function refreshSearchList() {
  var $li = document.querySelectorAll('.park-info-card');
  // console.log($li);
  for (var j = 0; j < $li.length; j++) {
    $searchResult.removeChild($li[j]);
  }
}

function submitSearch(event) {
  refreshSearchList();
  event.preventDefault();
  var result = 'q=' + event.target.elements.q.value + '&';
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://developer.nps.gov/api/v1/parks?limit=468&' + result + 'api_key=zfq2cSth1H6ynVcxdUiCUfdUdsTPyW6nusqU7OFY');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (var i = 0; i < xhr.response.data.length; i++) {
      var $parkInfoCard = document.createElement('li');
      $parkInfoCard.setAttribute('class', 'column-third park-info-card');

      var $parkInfoContentBox = document.createElement('div');
      $parkInfoContentBox.setAttribute('class', 'park-info-content-box');

      var $parkH3 = document.createElement('h3');
      $parkH3.textContent = xhr.response.data[i].fullName;

      var $parkImg = document.createElement('img');
      $parkImg.setAttribute('src', xhr.response.data[i].images[0].url);
      $parkImg.setAttribute('alt', xhr.response.data[i].images[0].altText);

      $parkInfoCard.appendChild($parkInfoContentBox);
      $parkInfoContentBox.appendChild($parkH3);
      $parkInfoContentBox.appendChild($parkImg);

      $searchResult.appendChild($parkInfoCard);
    }
  });
  xhr.send();
  // console.log($searchResult);
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
    $parkState.textContent = xhr.response.data[i].states;
    $parkLink.textContent = xhr.response.data[i].fullName;
    $parkLink.setAttribute('href', xhr.response.data[i].url);
    $parkWeatherInfo.textContent = xhr.response.data[i].weatherInfo;
    $cost.textContent = '$ ' + xhr.response.data[i].entranceFees[0].cost;
    $costDescription.textContent = xhr.response.data[i].entranceFees[0].description;
    $parkAddressLine1.textContent = xhr.response.data[i].addresses[0].line1;
    $parkAddressLine2.textContent = xhr.response.data[i].addresses[0].city + ' ' + xhr.response.data[i].addresses[0].stateCode + ' ' + xhr.response.data[i].addresses[0].postalCode;
    $parkPhoneNumber.textContent = 'Tel: ' + xhr.response.data[i].contacts.phoneNumbers[0].phoneNumber;
    $parkEmail.textContent = xhr.response.data[i].contacts.emailAddresses[0].emailAddress;
    $parkDetail.className = 'park-detail';
  });
  xhr.send();
}

function getRandomPark(event) {
  $mobileSearch.className = 'row mobile-search hidden';
  $homePage.className = 'home-page hidden';
  $body.className = 'overlay';
  getParkData();
}

function backHome(event) {
  $mobileSearch.className = 'row mobile-search';
  $homePage.className = 'home-page';
  $parkDetail.className = 'park-detail hidden';
  $body.removeAttribute('class');
}

$random.addEventListener('click', getRandomPark);
$backHome.addEventListener('click', backHome);

$mobileSearchSubmit.addEventListener('submit', submitSearch);
$desktopSearchSubmit.addEventListener('submit', submitSearch);

// function renderSearch(event) {
//   var $parkInfoCard = document.createElement('div');
//   $parkInfoCard.setAttribute('class', 'column-third park-info-card');

//   var $parkInfoContentBox = document.createElement('div');
//   $parkInfoContentBox.setAttribute('class', 'park-info-content-box');

//   var $parkH3 = document.createElement('h3');
//   $parkH3.textContent =

//   var $parkImg = document.createElement('img');
//   $parkImg.setAttribute = ('src', '');
//   $parkImg.setAttribute = ('alt', '');

//   $parkInfoCard.appendChild($parkInfoContentBox);
//   $parkInfoContentBox.appendChild($parkH3);
//   $parkInfoContentBox.appendChild($parkImg);
// }

// for (var i = 0; i = xhr.response.data.length; i++) {
//   var $parkInfoCard = document.createElement('div');
//   $parkInfoCard.setAttribute('class', 'column-third park-info-card');

//   var $parkInfoContentBox = document.createElement('div');
//   $parkInfoContentBox.setAttribute('class', 'park-info-content-box');

//   var $parkH3 = document.createElement('h3');
//   $parkH3.textContent = xhr.response.data[i].fullName;

//   var $parkImg = document.createElement('img');
//   $parkImg.setAttribute = ('src', xhr.response.data[i].images[0].url);
//   $parkImg.setAttribute = ('alt', xhr.response.data[i].images[0].altText);

//   $parkInfoCard.appendChild($parkInfoContentBox);
//   $parkInfoContentBox.appendChild($parkH3);
//   $parkInfoContentBox.appendChild($parkImg);

//   $searchResult.appendChild($parkInfoCard);
// }
