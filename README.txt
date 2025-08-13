# Kafka Local Docker Setup with Node.js

This project demonstrates running a **local Kafka cluster using Docker Compose** and producing/consuming messages with Node.js (`kafkajs`).

---

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed
- [Docker Compose](https://docs.docker.com/compose/install/) installed
- [Node.js](https://nodejs.org/en/download/) installed

---

## Docker Compose Services

The setup includes:

- **Zookeeper**: Kafka dependency
- **Kafka Broker**: Message broker
 

Your `docker-compose.yml` already defines these services.

---

## Running Kafka Locally


docker-compose down


1. **Start the cluster**

```bash
docker-compose up -d
