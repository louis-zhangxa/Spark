var $random = document.querySelector('#random');
var $mobileSearch = document.querySelector('.mobile-search');
var $homePage = document.querySelector('.home-page');
var $parkDetail = document.querySelector('.park-detail');
var $body = document.querySelector('body');
var $backHome = document.querySelector('#home');
var $mobileSearchSubmit = document.querySelector('.position-relative-mobile');
var $desktopSearchSubmit = document.querySelector('.position-relative-desktop');
var $mobileSearchBox = document.querySelector('#mobile-search-box');
var $desktopSearchBox = document.querySelector('#desktop-search-box');
var $searchResult = document.querySelector('.park-list-row');
var $parkList = document.querySelector('.park-list');
var $searchPlaceholder = document.querySelector('.search-placeholder');
var $userRandomButton = document.querySelector('.user-random-button');
var $favoriteButton = document.querySelector('.favorite-button');
var $favoriteIcon = document.querySelector('.fa-star');
var $favList = document.querySelector('.favorite-list');
var $favoritePlaceHolder = document.querySelector('.favorite-placeholder');
var $favoriteListButton = document.querySelector('.favorite-list-button');
var $favoriteListRow = document.querySelector('.favorite-list-row');
var $emptyDataButton = document.querySelector('.empty-data-button');

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

// var parkInLocalStorage = {
//   fullName: null,
//   photoUrl: null,
//   photoAlt: null,
//   parkCode: null
// };

var parkReceived = {
  fullName: null,
  photoUrl: null,
  photoAlt: null,
  parkCode: null
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function refreshSearchList(card, node) {
  var $li = document.querySelectorAll(card);
  for (var j = 0; j < $li.length; j++) {
    node.removeChild($li[j]);
  }
}

function submitSearch(event) {
  showSearchResult();
  refreshSearchList('.park-info-card', $searchResult);
  event.preventDefault();
  var result = 'q=' + event.target.elements.q.value + '&';
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://developer.nps.gov/api/v1/parks?limit=468&' + result + 'api_key=zfq2cSth1H6ynVcxdUiCUfdUdsTPyW6nusqU7OFY');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    if (xhr.response.data.length !== 0) {
      $searchPlaceholder.className = 'search-placeholder hidden';
      for (var i = 0; i < xhr.response.data.length; i++) {
        var $parkInfoCard = document.createElement('li');
        $parkInfoCard.setAttribute('class', 'column-third park-info-card');

        var $parkInfoContentBox = document.createElement('div');
        $parkInfoContentBox.setAttribute('class', 'park-info-content-box');

        var $parkH3 = document.createElement('h3');
        $parkH3.textContent = xhr.response.data[i].fullName;

        var $parkImg = document.createElement('img');
        $parkImg.className = 'park-image';
        $parkImg.setAttribute('src', xhr.response.data[i].images[0].url);
        $parkImg.setAttribute('alt', xhr.response.data[i].images[0].altText);
        $parkImg.setAttribute('park-code', xhr.response.data[i].parkCode);

        $parkInfoCard.appendChild($parkInfoContentBox);
        $parkInfoContentBox.appendChild($parkH3);
        $parkInfoContentBox.appendChild($parkImg);

        $searchResult.appendChild($parkInfoCard);
      }
    } else {
      $searchPlaceholder.className = 'search-placeholder';
    }
  });
  xhr.send();
}

function checkParkStatus(parkcode) {
  if (data.parks.length !== 0) {
    for (var i = 0; i < data.parks.length; i++) {
      if (data.parks[i].parkCode === parkcode) {
        $favoriteIcon.className = 'fa-solid fa-star';
        return false;
      }
    }
    $favoriteIcon.className = 'fa-regular fa-star';
  }
}

function saveFavoritePark() {
  if ($favoriteIcon.className !== 'fa-solid fa-star') {
    $favoriteIcon.className = 'fa-solid fa-star';
    var parkInLocalStorage = {
      fullName: parkReceived.fullName,
      photoUrl: parkReceived.photoUrl,
      photoAlt: parkReceived.photoAlt,
      parkCode: parkReceived.parkCode
    };
    data.parks.unshift(parkInLocalStorage);
  } else {
    $favoriteIcon.className = 'fa-regular fa-star';
    for (var j = 0; j < data.parks.length; j++) {
      if (data.parks[j].parkCode === parkInLocalStorage.parkCode) {
        data.parks.splice(j, 1);
        break;
      }
    }
  }
}

function getParkData() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://developer.nps.gov/api/v1/parks?limit=468&api_key=zfq2cSth1H6ynVcxdUiCUfdUdsTPyW6nusqU7OFY');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var i = getRandomInt(468);

    parkReceived = {
      fullName: xhr.response.data[i].fullName,
      photoUrl: xhr.response.data[i].images[0].url,
      photoAlt: xhr.response.data[i].images[0].altText,
      parkCode: xhr.response.data[i].parkCode
    };

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

    checkParkStatus(parkReceived.parkCode);
    $parkDetail.className = 'park-detail';
  });
  xhr.send();
}

function getParkDataByParkCode() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://developer.nps.gov/api/v1/parks?parkCode=' + parkReceived.parkCode + '&limit=1&api_key=zfq2cSth1H6ynVcxdUiCUfdUdsTPyW6nusqU7OFY');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {

    parkReceived = {
      fullName: xhr.response.data[0].fullName,
      photoUrl: xhr.response.data[0].images[0].url,
      photoAlt: xhr.response.data[0].images[0].altText,
      parkCode: xhr.response.data[0].parkCode
    };

    $parkName.textContent = xhr.response.data[0].fullName;
    $parkImages1.setAttribute('src', xhr.response.data[0].images[0].url);
    $parkImages1.setAttribute('alt', xhr.response.data[0].images[0].altText);
    $parkDescription.textContent = xhr.response.data[0].description;
    $parkState.textContent = xhr.response.data[0].states;
    $parkLink.textContent = xhr.response.data[0].fullName;
    $parkLink.setAttribute('href', xhr.response.data[0].url);
    $parkWeatherInfo.textContent = xhr.response.data[0].weatherInfo;
    $cost.textContent = '$ ' + xhr.response.data[0].entranceFees[0].cost;
    $costDescription.textContent = xhr.response.data[0].entranceFees[0].description;
    $parkAddressLine1.textContent = xhr.response.data[0].addresses[0].line1;
    $parkAddressLine2.textContent = xhr.response.data[0].addresses[0].city + ' ' + xhr.response.data[0].addresses[0].stateCode + ' ' + xhr.response.data[0].addresses[0].postalCode;
    $parkPhoneNumber.textContent = 'Tel: ' + xhr.response.data[0].contacts.phoneNumbers[0].phoneNumber;
    $parkEmail.textContent = xhr.response.data[0].contacts.emailAddresses[0].emailAddress;

    checkParkStatus(parkReceived.parkCode);

    $parkDetail.className = 'park-detail';
  });
  xhr.send();
}

function getFavoriteParkList(event) {
  showFavList();
  refreshSearchList('.favorite-info-card', $favoriteListRow);
  if (data.parks.length !== 0) {
    $favoritePlaceHolder.className = 'favorite-placeholder hidden';
    for (var i = 0; i < data.parks.length; i++) {
      var $favParkInfoCard = document.createElement('li');
      $favParkInfoCard.setAttribute('class', 'column-third favorite-info-card');
      $favParkInfoCard.setAttribute('park-code', data.parks[i].parkCode);

      var $favParkInfoContentBox = document.createElement('div');
      $favParkInfoContentBox.setAttribute('class', 'favorite-info-content-box');

      var $favParkH3 = document.createElement('h3');
      $favParkH3.textContent = data.parks[i].fullName;

      var $favParkImg = document.createElement('img');
      $favParkImg.className = 'favorite-park-image';
      $favParkImg.setAttribute('src', data.parks[i].photoUrl);
      $favParkImg.setAttribute('alt', data.parks[i].photoAlt);
      $favParkImg.setAttribute('park-code', data.parks[i].parkCode);

      var $trash = document.createElement('div');
      $trash.setAttribute('class', 'row trash');

      var $trashButton = document.createElement('button');
      $trashButton.setAttribute('class', 'trash-can');

      var $trashIcon = document.createElement('i');
      $trashIcon.setAttribute('class', 'fa-solid fa-trash-can');

      $favParkInfoCard.appendChild($favParkInfoContentBox);
      $favParkInfoContentBox.appendChild($favParkH3);
      $favParkInfoContentBox.appendChild($favParkImg);
      $favParkInfoContentBox.appendChild($trash);
      $trash.appendChild($trashButton);
      $trashButton.appendChild($trashIcon);

      $favoriteListRow.appendChild($favParkInfoCard);
    }
  } else {
    $favoritePlaceHolder.className = 'favorite-placeholder';
  }
}

function showSearchResult(event) {
  $favList.className = 'favorite-list hidden';
  $parkList.className = '$parkList';
  $homePage.className = 'home-page hidden';
  $body.className = 'overlay';
  $parkDetail.className = 'park-detail hidden';
}

function showFavList(event) {
  $favList.className = 'favorite-list';
  $parkList.className = '$parkList hidden';
  $homePage.className = 'home-page hidden';
  $body.className = 'overlay';
  $parkDetail.className = 'park-detail hidden';
}

function getRandomPark(event) {
  $favList.className = 'favorite-list hidden';
  $mobileSearch.className = 'row mobile-search hidden';
  $homePage.className = 'home-page hidden';
  $body.className = 'overlay';
  $parkList.className = 'park-list hidden';
  getParkData();
}

function backHome(event) {
  $mobileSearchBox.value = '';
  $desktopSearchBox.value = '';
  $mobileSearch.className = 'row mobile-search';
  $homePage.className = 'home-page';
  $parkDetail.className = 'park-detail hidden';
  $parkList.className = 'park-list hidden';
  $favList.className = 'favorite-list hidden';
  $body.removeAttribute('class');
}

$searchResult.addEventListener('click', function (event) {
  if (event.target.className === 'park-image') {
    parkReceived.parkCode = event.target.getAttribute('park-code');
    getParkDataByParkCode();
    $mobileSearch.className = 'row mobile-search hidden';
    $homePage.className = 'home-page hidden';
    $body.className = 'overlay';
    $parkList.className = 'park-list hidden';
    $favList.className = 'favorite-list hidden';
    $mobileSearchBox.value = '';
    $desktopSearchBox.value = '';
  }
});

$favoriteListRow.addEventListener('click', function (event) {
  if (event.target.className === 'favorite-park-image') {
    parkReceived.parkCode = event.target.getAttribute('park-code');
    getParkDataByParkCode();
    $mobileSearch.className = 'row mobile-search hidden';
    $homePage.className = 'home-page hidden';
    $body.className = 'overlay';
    $parkList.className = 'park-list hidden';
    $favList.className = 'favorite-list hidden';
    $mobileSearchBox.value = '';
    $desktopSearchBox.value = '';
  }
});

$favoriteListRow.addEventListener('click', function (event) {
  var parkCode = event.target.closest('.column-third').getAttribute('park-code');
  if (event.target.className === 'fa-solid fa-trash-can' || event.target.className === 'trash-can') {
    var $li = document.querySelectorAll('.favorite-info-card');
    for (var i = 0; i < $li.length; i++) {
      if ($li[i].getAttribute('park-code') === parkCode) {
        $favoriteListRow.removeChild($li[i]);
      }
    }
    for (var j = 0; j < data.parks.length; j++) {
      if (data.parks[j].parkCode === parkCode) {
        data.parks.splice(j, 1);
      }
    }
    if (data.parks.length === 0 || null) {
      $favoritePlaceHolder.setAttribute('class', 'favorite-placeholder');
    }
  }
});

$emptyDataButton.addEventListener('click', getRandomPark);
$favoriteListButton.addEventListener('click', getFavoriteParkList);
$favoriteButton.addEventListener('click', saveFavoritePark);
$userRandomButton.addEventListener('click', getRandomPark);
$random.addEventListener('click', getRandomPark);
$backHome.addEventListener('click', backHome);

$mobileSearchSubmit.addEventListener('submit', submitSearch);
$desktopSearchSubmit.addEventListener('submit', submitSearch);
