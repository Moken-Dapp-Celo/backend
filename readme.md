# Moken backend

## Description

This is the backend for the Moken project. This project contains a MQTT broker which is used to communicate the iot door lock with the blockchain. The brocker connects to two topics: "checkIn" which is used to check if an user has permission to enter the room and "result" which is used to communicate with to lock whether the user has permission to enter the room or not.

## Setup

On the root directory, run:

```bash
npm install
```

Create a .env file based on the .env.tmpl in the root directory file and fill the variables with the correct values. Then run:

```bash
npm run start
```

## Folder structure

```bash
.
├── app.js
├── contracts
│   └── moken.json
├── ethers
│   └── index.js
├── mqtt
│   └── index.js
├── package.json
├── package-lock.json
├── readme.md
└── utils
    └── date.js
```

