const client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");
const topic = "pluviometro/dato";
let datos = [];
let datosFiltrados = [];

client.on("connect", () => {
  console.log("Conectado al broker");
  client.subscribe(topic);
});

client.on("message", (topic, message) => {
  const valor = message.toString();
  const ahora = new Date();
  const fecha = ahora.toISOString().split("T")[0]; // "2025-07-03"
  const hora = ahora.toLocaleTimeString();
  datos.unshift({ fecha, hora, valor });
  guardarLocal();
  aplicarFiltros();
});

function guardarLocal() {
  localStorage.setItem("datosLluvia", JSON.stringify(datos));
}

function cargarDatos() {
  const guardados = localStorage.getItem("datosLluvia");
  if (guardados) {
    datos = JSON.parse(guardados);
  }
  aplicarFiltros();
}

function aplicarFiltros() {
  const desde = document.getElementById("filtro-desde").value;
  const hasta = document.getElementById("filtro-hasta").value;
  const min = parseFloat(document.getElementById("filtro-min").value);
  const max = parseFloat(document.getElementById("filtro-max").value);

  datosFiltrados = datos.filter(d => {
    const fechaOk = (!desde || d.fecha >= desde) && (!hasta || d.fecha <= hasta);
    const valor = parseFloat(d.valor);
    const valorOk = (!isNaN(min) ? valor >= min : true) && (!isNaN(max) ? valor <= max : true);
    return fechaOk && valorOk;
  });

  actualizarTabla();
}

function limpiarFiltros() {
  document.getElementById("filtro-desde").value = "";
  document.getElementById("filtro-hasta").value = "";
  document.getElementById("filtro-min").value = "";
  document.getElementById("filtro-max").value = "";
  aplicarFiltros();
}

function actualizarTabla() {
  const tbody = document.getElementById("tabla-datos");
  const cantidad = document.getElementById("cantidad")?.value || "10";
  tbody.innerHTML = "";

  let aMostrar = datosFiltrados;
  if (cantidad !== "todos") {
    aMostrar = datosFiltrados.slice(0, parseInt(cantidad));
  }

  if (aMostrar.length === 0) {
    tbody.innerHTML = "<tr><td colspan='4'>Sin datos disponibles</td></tr>";
    return;
  }

  aMostrar.forEach((d, i) => {
    const fila = `<tr>
      <td>${i + 1}</td>
      <td>${d.fecha}</td>
      <td>${d.hora}</td>
      <td>${d.valor}</td>
    </tr>`;
    tbody.innerHTML += fila;
  });
}

function exportarCSV() {
  let csv = "Fecha,Hora,Lluvia (mm)\n";
  datosFiltrados.forEach(d => {
    csv += `${d.fecha},${d.hora},${d.valor}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "datos_filtrados.csv";
  a.click();
  URL.revokeObjectURL(a.href);
}

function exportarExcel() {
  const hoja = datosFiltrados.map(d => ({
    Fecha: d.fecha,
    Hora: d.hora,
    Lluvia: parseFloat(d.valor)
  }));

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(hoja);
  XLSX.utils.book_append_sheet(wb, ws, "Lluvia");
  XLSX.writeFile(wb, "datos_filtrados.xlsx");
}

window.onload = cargarDatos;
