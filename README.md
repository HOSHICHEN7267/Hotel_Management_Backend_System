# Hotel Management Backend System

This is a backend project for managing hotel information using the NestJS framework. It includes functionalities for adding, updating, and retrieving hotel data, as well as importing hotel data from a CSV file.

## Description

This project is built with [NestJS](https://nestjs.com/), a progressive Node.js framework for building efficient and scalable server-side applications. It uses TypeORM for database interactions and supports MySQL as the database.

## Importing Hotels from CSV

To import hotels from a CSV file, send a POST request to `/hotels/upload` with the CSV file. The file should have the following columns: `name`, `address`, `email`, `country`, `city`, `longitude`, `latitude`, `is_open`.

## API Endpoints

- `GET /hotels`: Retrieve all hotels.
- `POST /hotels`: Add a new hotel.
- `PUT /hotels/:id`: Update an existing hotel.
- `POST /hotels/upload`: Upload a CSV file to import hotels.

## Project Structure

```text
.github/
  └── workflows/
      └── ci-cd.yml

docker-compose.yml

Dockerfile

hotel-management/
  ├── package.json
  ├── package-lock.json
  ├── README.md
  ├── src/
  │   ├── app.controller.spec.ts
  │   ├── app.controller.ts
  │   ├── app.module.ts
  │   ├── app.service.ts
  │   ├── hotel/
  │   │   ├── hotel.controller.spec.ts
  │   │   ├── hotel.controller.ts
  │   │   ├── hotel.entity.ts
  │   │   ├── hotel.module.ts
  │   │   ├── hotel.service.spec.ts
  │   │   └── hotel.service.ts
  │   └── main.ts
  └── test/
      ├── app.e2e-spec.ts
      └── jest-e2e.json

test_input.csv
```

## Prerequisites

- Node.js (version 16)
- Docker
- Docker Compose
- MySQL

## Setup

### Install Dependencies

1. Clone the repository:

```bash
git clone <repository-url>
cd hotel-management
```

2. Install the dependencies:

```bash
npm install
cd hotel-management
npm install
```

### Running the Application

#### Using Docker

1. Build and start the containers:

```bash
docker-compose up --build
```

2. The application will be available at `http://localhost:3000`.

#### Without Docker

1. Start the MySQL database:

```bash
docker run --name mysql -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=hotel_db -p 3307:3306 -d mysql:8
```

2. Start the application:

```bash
npm run start:dev
```

3. The application will be available at `http://localhost:3000`.

## Running Tests

### Unit Tests

To run the unit tests:

```bash
npm run test
```

## CI/CD Pipeline

The CI/CD pipeline is configured using GitHub Actions. It includes steps for checking out the code, setting up Node.js, installing dependencies, running tests, building the Docker image, and pushing it to Docker Hub.
