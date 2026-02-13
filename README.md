# Node.js Express Tutorial Server

A simple Node.js tutorial server built with Express.js, hosting two HTTP endpoints. This project demonstrates basic Express application setup, routing, and testing with Jest and Supertest.

## Prerequisites

Before running this project, ensure the following tools are installed:

- **Node.js** — v20.20.0 or later
- **npm** — v11.1.0 or later

## Installation

Clone the repository and install all dependencies:

```bash
npm install
```

This installs the following packages:

- **express** — Production web framework
- **jest** — Development testing framework
- **supertest** — Development HTTP assertion library

## Project Structure

```
├── src/
│   ├── app.js              # Express application module (exports app instance)
│   └── server.js           # Server entry point (calls app.listen())
├── tests/
│   └── app.test.js         # Test suite for all Express endpoints
├── jest.config.js          # Jest test runner configuration
├── package.json            # Project manifest and dependency definitions
└── README.md               # Project documentation
```

- **`src/app.js`** — Creates and configures the Express application, registers route handlers, and exports the `app` object without calling `.listen()`. This separation enables Supertest to bind to an ephemeral port during testing.
- **`src/server.js`** — Imports the `app` instance from `src/app.js` and starts the HTTP server on a configured port.
- **`tests/app.test.js`** — Contains all unit and integration tests for endpoint behavior, 404 handling, and HTTP method validation.
- **`jest.config.js`** — Configures Jest with the `node` test environment, test file discovery patterns, and coverage thresholds.
- **`package.json`** — Defines project metadata, dependencies, and npm scripts for running and testing the application.

## Endpoints

| Method | Route            | Response Body    | Status Code | Content-Type |
|--------|------------------|------------------|-------------|--------------|
| GET    | `/`              | `Hello world`    | 200         | text/plain   |
| GET    | `/good-evening`  | `Good evening`   | 200         | text/plain   |

### GET /

Returns the plain-text response `"Hello world"` with HTTP status 200.

### GET /good-evening

Returns the plain-text response `"Good evening"` with HTTP status 200.

## Running the Server

Start the application server:

```bash
node src/server.js
```

The server will start listening on the configured port (default: 3000). You can then access the endpoints at:

- `http://localhost:3000/` — Returns `"Hello world"`
- `http://localhost:3000/good-evening` — Returns `"Good evening"`

## Running Tests

Run all tests in a single pass (non-interactive):

```bash
npm test
```

Run tests with coverage reporting:

```bash
npm run test:coverage
```

The coverage report is generated in the `coverage/` directory.

## Test Coverage

This project targets **90%+ coverage** across all metrics:

| Metric     | Target |
|------------|--------|
| Lines      | 90%+   |
| Branches   | 90%+   |
| Functions  | 90%+   |
| Statements | 90%+   |

Coverage is enforced via thresholds configured in `jest.config.js`. The `src/server.js` entry point is excluded from coverage thresholds since its `.listen()` call is not directly testable without spawning a live server process.

## Technology Stack

| Package      | Version | Purpose                                      |
|--------------|---------|----------------------------------------------|
| Express      | 5.2.1   | Web framework for routing and HTTP handling  |
| Jest         | 30.2.0  | Testing framework with built-in coverage     |
| Supertest    | 7.2.2   | HTTP assertion library for endpoint testing  |
| Node.js      | 20.20.0 | JavaScript runtime environment               |
