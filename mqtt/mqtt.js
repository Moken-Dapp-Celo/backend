const mqtt = require("mqtt");
require("dotenv").config();

class MqttHandler {
  constructor() {
    console.log("Initializing MQTT handler");

    this.host = process.env.MQTT_HOST;
    this.port = 8884; // Use the provided port
    this.protocol = "mqtts"; // MQTT over TLS
    this.username = process.env.MQTT_USERNAME;
    this.password = process.env.MQTT_PASSWORD;
    this.clientId = process.env.ClientID;
  }

  connect() {
    // MQTT connection options
    const options = {
      clientId: this.clientId,
      username: this.username,
      password: this.password,
      clean: true, // Clean session
    };

    // Connect to MQTT broker
    this.mqttClient = mqtt.connect(this.protocol + "://" + this.host, options);

    // Handle MQTT connection events
    this.mqttClient.on("error", (err) => {
      console.error("MQTT error:", err);
    });

    this.mqttClient.on("connect", () => {
      console.log(`Connected to MQTT broker`);
      // Subscribe to desired topics here
      this.mqttClient.subscribe("transfer2", { qos: 0 });
      this.mqttClient.publish("transfer2", "Hello mqtt");
    });

    this.mqttClient.on("message", (topic, message) => {
      console.log(
        `Received message on topic "${topic}": ${message.toString()}`
      );
      // Handle incoming messages as needed
    });

    this.mqttClient.on("close", () => {
      console.log(`Disconnected from MQTT broker`);
      // Handle reconnection or other actions if needed
    });
  }
}

// Usage
const mqttHandler = new MqttHandler();
mqttHandler.connect();
