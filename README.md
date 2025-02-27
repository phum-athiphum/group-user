# NestJS User Service

## Project Setup
To get started, install the project dependencies:
```sh
npm install
```

## Running the Project
Start the NestJS server using:
```sh
npm run start
```
For development mode with auto-reloading, use:
```sh
npm run start:dev
```

## Running Redis with Docker
To ensure Redis is running, start it using Docker:
```sh
docker-compose up -d
```
This will start a Redis container on port `6379`.

## Testing the Service
The main service to test is the **User Service**, accessible via the following API:

### GET `/user`
This endpoint fetches user data from an external API and groups them by department.

**Example Request:**
```sh
curl -X GET http://localhost:8000/user
```
Or open your browser and navigate to:
```
http://localhost:8000/user
```

If successful, the response will be a JSON object containing users grouped by department.

