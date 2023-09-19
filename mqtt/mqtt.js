const mqtt = require("mqtt");
require("dotenv").config();
const { MokenContract } = require("../ethers/index.js");
const fs = require("fs");
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

    this.mqttClient.on("message", async (topic, message) => {
      console.log(
        `Received message on topic "${topic}": ${message.toString()}`
      );
      // Handle incoming messages as needed
      if (topic === "transfer2") {
        console.log("Do something");
        try {
          const contract = MokenContract();

          const result = await contract.functions.emit_event();

          console.log(result);
          let txrecipt = await result.wait();
          try {
            let event = txrecipt.events[0];
            const values = event.args;
            console.log("events", event);
            console.log("values", values);
            let a = values.a;
            console.log("a", a);
            console.log("a", a.toString());
          } catch (error) {
            console.log(error);
          }

          // save result tp result.txt

          fs.writeFile("./result.txt", String(result), function (err) {
            if (err) throw err;
            console.log("Saved!");
          });
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
