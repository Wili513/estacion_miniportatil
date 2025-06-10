let maxRows = parseInt(document.getElementById("limite").value);
document.getElementById("limite").addEventListener("change", () => {
  maxRows = parseInt(document.getElementById("limite").value);
  updateTable();
});

function updateTable() {
  const tabla = document.getElementById("tabla-body");
  tabla.innerHTML = "";
  const datos = getStoredData().slice(0, maxRows);
  datos.forEach(d => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${d.fecha}</td><td>${d.temperatura}</td><td>${d.humedad}</td>`;
    tabla.appendChild(row);
  });
}
