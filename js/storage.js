const localStorageKey = "dht11_data";

function saveData(entry) {
  const datos = JSON.parse(localStorage.getItem(localStorageKey)) || [];
  datos.unshift(entry);
  localStorage.setItem(localStorageKey, JSON.stringify(datos.slice(0, 1000)));
}

function getStoredData() {
  return JSON.parse(localStorage.getItem(localStorageKey)) || [];
}
