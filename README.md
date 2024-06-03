# Project Title: ServerFarm Full-Stack Developer Interview Test Project

## Overview

This project is a full-stack application designed to demonstrate the integration of multiple backend services with a frontend interface. This project leverages Docker for containerization, ensuring a consistent and replicable development and deployment environment. The stack includes an Express.js backend, MySQL and MongoDB databases, a Kafka message broker, and a React frontend.

## Table of Contents
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Services](#services)
- [Environment Variables](#environment-variables)

## Project Structure

```
.
├── backend
├── frontend
├── kafka-consumer
├── compose.yaml
└── README.md
```


- **backend**: Contains the Express.js server code.
- **frontend**: Contains the React.js application code.
- **kafka-consumer**: Contains the Kafka consumer implementation.
- **compose.yaml**: Docker Compose file to orchestrate the multi-container environment.
- **README.md**: Documentation file.

## Technologies Used

- **Backend**: Express.js, Node.js, MySQL, MongoDB
- **Frontend**: React.js, TailwindCSS, Jest, Reat Testing Library
- **Message Broker**: Apache Kafka
- **Containerization**: Docker, Docker Compose

## Setup Instructions

### Prerequisites

Ensure you have the following installed on your machine:
- Docker
- Docker Compose

### Installation

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/j-wang-08/serverfarm-fullstack-test.git
    cd serverfarm-fullstack-test
    ```

2. **Start the Services**:
    ```bash
    docker-compose up -d
    ```

    This command will build the Docker images (if not already built) and start the containers in detached mode.

## Usage

Once the services are up and running, you can access the application as follows:

- **Frontend**: `http://localhost:3000`
- **Backend**: `http://localhost:5000`
- **Kafka Consumer**: The Kafka consumer runs in the background processing messages from the `serverfarm-new-post` topic.

## Services

### Backend

- **Port**: 5000
- **Description**: Handles API requests and communicates with MySQL and MongoDB databases.

### Frontend

- **Port**: 3000
- **Description**: React application providing the user interface.

### Kafka Consumer

- **Description**: Listens to messages on the Kafka topic `serverfarm-new-post` and processes them accordingly.

### MySQL

- **Port**: 3306
- **Description**: Relational database for structured data storage.

### MongoDB

- **Port**: 27017
- **Description**: NoSQL database for flexible, document-oriented data storage.

### Zookeeper

- **Port**: 2181
- **Description**: Centralized service for maintaining configuration information and providing distributed synchronization.

### Kafka

- **Port**: 9092
- **Description**: Message broker for handling real-time data feeds.

### Init-Kafka

- **Description**: Initializes Kafka by creating the `serverfarm-new-post` topic.

## Environment Variables

### Backend

- `NODE_ENV`: Set to `development` for development mode.
- `MYSQL_HOST`: Hostname for MySQL service (e.g., `mysql`).
- `MYSQL_PORT`: Port for MySQL service (default: `3306`).
- `MYSQL_DATABASE`: Name of the MySQL database.
- `MYSQL_USERNAME`: MySQL username.
- `MYSQL_PASSWORD`: MySQL password.
- `MONGODB_URL`: Connection string for MongoDB.
- `MONGODB_DATABASE`: Name of the MongoDB database.
- `JWT_SECRET_KEY`: Secret key for JWT authentication.
- `KAFKA_HOST`: Hostname for Kafka service (e.g., `kafka`).
- `KAFKA_PORT`: Port for Kafka service (default: `9092`).
- `KAFKA_TOPIC`: Kafka topic name for new posts (default: `serverfarm-new-post`).

### Kafka Consumer

- `NODE_ENV`: Set to `development` for development mode.
- `KAFKA_HOST`: Hostname for Kafka service (e.g., `kafka`).
- `KAFKA_PORT`: Port for Kafka service (default: `9092`).
- `KAFKA_TOPIC`: Kafka topic name for new posts (default: `serverfarm-new-post`).

### MySQL

- `MARIADB_DATABASE`: Name of the MySQL database.
- `MARIADB_USER`: MySQL username.
- `MARIADB_ALLOW_EMPTY_ROOT_PASSWORD`: Set to `1` to allow empty root password.
- `MARIADB_ROOT_PASSWORD`: MySQL root password.
- `MARIADB_PASSWORD`: MySQL password.

### MongoDB

- `MONGO_INITDB_ROOT_USERNAME`: MongoDB root username.
- `MONGO_INITDB_ROOT_PASSWORD`: MongoDB root password.