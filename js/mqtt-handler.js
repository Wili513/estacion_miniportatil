const broker = 'wss://broker.hivemq.com:8884/mqtt';
const client = mqtt.connect(broker);
const topic = 'wemos/dht11';

client.on('connect', () => {
  document.getElementById("status").innerHTML = "✅ Conectado a HiveMQ";
  client.subscribe(topic);
});

client.on('message', (topic, message) => {
  const data = JSON.parse(message.toString());
  const now = new Date().toLocaleString();
  const entry = { fecha: now, temperatura: data.temperatura, humedad: data.humedad };
  saveData(entry);
  updateTable();
});
