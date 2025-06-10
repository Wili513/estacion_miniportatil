const datos = getStoredData().reverse();
const labels = datos.map(d => d.fecha);
const temps = datos.map(d => d.temperatura);
const hums = datos.map(d => d.humedad);

new Chart(document.getElementById("graficaTemp"), {
  type: 'line',
  data: {
    labels: labels,
    datasets: [{
      label: 'Temperatura (°C)',
      data: temps,
      borderColor: 'red',
      fill: false
    }]
  }
});

new Chart(document.getElementById("graficaHum"), {
  type: 'line',
  data: {
    labels: labels,
    datasets: [{
      label: 'Humedad (%)',
      data: hums,
      borderColor: 'blue',
      fill: false
    }]
  }
});
