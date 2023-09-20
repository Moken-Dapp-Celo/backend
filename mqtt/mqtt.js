const mqtt = require("mqtt");
require("dotenv").config();
const { MokenContract } = require("../ethers/index.js");
const fs = require("fs");
const { getDayOfYear } = require("../utils/date.js");
const { get } = require("http");
class MqttHandler {
  constructor() {
    console.log("Initializing MQTT handler");
    console.log("date", getDayOfYear(new Date()));
    this.host = process.env.MQTT_HOST;
    this.port = 0; // Use the provided port
    this.protocol = "mqtts"; // MQTT over TLS
    this.username = process.env.MQTT_USERNAME;
    this.password = process.env.MQTT_PASSWORD;
    this.clientId = process.env.ClientID;
  }

  connect() {
    // MQTT connection options
    const options = {
      username: this.username,
      password: this.password,
      clean: true, // Clean session
      port: this.port,

      ssl_params: {
        server_hostname: "27c4ac6276f441e49d6e912f9be0e6d2.s1.eu.hivemq.cloud",
        rejectUnauthorized: false,
      },
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
      this.mqttClient.subscribe("checkIn", { qos: 0 });
    });

    this.mqttClient.on("message", async (topic, message) => {
      console.log(
        `Received message on topic "${topic}": ${message.toString()}`
      );
      // Handle incoming messages as needed
      if (topic === "checkIn") {
        console.log("Do something");
        try {
          const contract = MokenContract();
          try {
            const result = await contract.functions.checkIn(
              getDayOfYear(new Date()),
              message.toString()
            );
            console.log(result);
            console.log("result", result.toString());
            this.mqttClient.publish("result", result.toString());
          } catch (error) {
            console.log(error);
          }
        } catch (error) {
          console.log(error);
        }
      }
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
