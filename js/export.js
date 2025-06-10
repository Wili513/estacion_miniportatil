function exportCSV() {
  const datos = getStoredData();
  let csv = "Fecha,Temperatura,Humedad\n";
  datos.forEach(d => {
    csv += `${d.fecha},${d.temperatura},${d.humedad}\n`;
  });
  downloadFile(csv, "datos.csv", "text/csv");
}

function exportExcel() {
  const datos = getStoredData();
  let content = `<table><tr><th>Fecha</th><th>Temperatura</th><th>Humedad</th></tr>`;
  datos.forEach(d => {
    content += `<tr><td>${d.fecha}</td><td>${d.temperatura}</td><td>${d.humedad}</td></tr>`;
  });
  content += `</table>`;
  const blob = new Blob([content], { type: "application/vnd.ms-excel" });
  downloadFile(blob, "datos.xls", "application/vnd.ms-excel");
}

function downloadFile(content, filename, type) {
  const blob = content instanceof Blob ? content : new Blob([content], { type });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}
