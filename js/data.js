// /* exported data */
var data = {
  view: 'favorite-list',
  parks: [],
  editing: null,
  nextEntryId: 1
};

function storeDataInLocalStorage(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage-park', dataJSON);
}

var previousDataJson = localStorage.getItem('javascript-local-storage-park');
if (previousDataJson !== null) {
  data = JSON.parse(previousDataJson);
}

window.addEventListener('beforeunload', storeDataInLocalStorage);
window.addEventListener('pagehide', storeDataInLocalStorage);
