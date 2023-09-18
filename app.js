// Initialize the mqtt client and connect to the broker
const mqttHandler = require('./mqtt/mqtt')

var mqttClient = new mqttHandler()
mqttClient.connect()