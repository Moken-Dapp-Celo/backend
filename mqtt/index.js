const mqtt = require('mqtt');
require('dotenv').config();
const fs = require('fs');
const http = require('http');

const { MokenContract } = require('../ethers/index.js');
const { getDayOfYear } = require('../utils/date.js');

class MqttHandler {
	initialize() {
		console.log('Initializing MQTT handler');
		this.configureMQTT();
		this.connectToBroker();
	}

	configureMQTT() {
		this.host = process.env.MQTT_HOST;
		this.port = process.env.MQTT_PORT || 0; // Use the provided port or default to 0
		this.protocol = 'mqtts'; // MQTT over TLS
		this.username = process.env.MQTT_USERNAME;
		this.password = process.env.MQTT_PASSWORD;
		this.clientId = process.env.MQTT_CLIENT_ID;
	}

	connectToBroker() {
		const options = this.getMQTTOptions();
		this.mqttClient = mqtt.connect(`${this.protocol}://${this.host}`, options);
		this.setupEventHandlers();
	}

	getMQTTOptions() {
		return {
			username: this.username,
			password: this.password,
			clean: true, // Clean session
			port: this.port,
			ssl_params: {
				server_hostname: process.env.MQTT_SERVER_HOSTNAME,
				rejectUnauthorized: false,
			},
		};
	}

	setupEventHandlers() {
		this.mqttClient.on('error', this.handleMQTTError.bind(this));
		this.mqttClient.on('connect', this.handleMQTTConnect.bind(this));
		this.mqttClient.on('message', this.handleMQTTMessage.bind(this));
		this.mqttClient.on('close', this.handleMQTTClose.bind(this));
	}

	handleMQTTError(err) {
		console.error('MQTT error:', err);
	}

	handleMQTTConnect() {
		console.log('Connected to MQTT broker');
		this.mqttClient.subscribe('checkIn', { qos: 0 });
	}

	async handleMQTTMessage(topic, message) {
		console.log(`Received message on topic "${topic}": ${message.toString()}`);
		if (topic === 'checkIn') {
			await this.processCheckInMessage(message);
		}
	}

	async processCheckInMessage(message) {
		try {
			const contract = MokenContract();
			console.log('Checking day of year:', getDayOfYear(new Date()));
			const result = await contract.checkIn(getDayOfYear(new Date()), message.toString());
			console.log('result', result.toString());
			this.mqttClient.publish('result', result.toString());
		} catch (error) {
			console.error('Error processing check-in:', error);
		}
	}

	handleMQTTClose() {
		console.log('Disconnected from MQTT broker');
	}
}

module.exports = MqttHandler;
