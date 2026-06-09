# Node.js Express Tutorial Server

A simple Node.js tutorial server built with [Express.js](https://expressjs.com/) that hosts two HTTP endpoints. This project demonstrates the basics of setting up an Express application, registering routes, and testing the endpoints with [Jest](https://jestjs.io/) and [Supertest](https://github.com/ladjs/supertest).

## Prerequisites

- **Node.js** — v20.20.0 or later
- **npm** — v11.1.0 or later

> Express 5 requires Node.js version 18 or higher; the versions above are the documented project baseline.

## Installation

Install the dependencies from the repository root:

```bash
npm install
```

`npm install` resolves and installs the following packages:

- **express** — production web framework that powers the routing and HTTP handling.
- **jest** — development testing framework with built-in coverage.
- **supertest** — development HTTP assertion library used to drive the Express app in tests.

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

- **`src/app.js`** — Creates and configures the Express application, registers the route handlers, and exports the `app` instance **without** calling `.listen()`. This separation lets Supertest bind the app to an ephemeral port during testing.
- **`src/server.js`** — Imports `app` and starts the HTTP server on a configured port.
- **`tests/app.test.js`** — Unit and integration tests covering endpoint behavior, 404 handling, and HTTP method validation.
- **`jest.config.js`** — Configures the Jest `node` test environment, test discovery, and coverage thresholds.
- **`package.json`** — Project metadata, dependencies, and npm scripts.

## Endpoints

| Method | Route           | Response Body  | Status Code | Content-Type |
| ------ | --------------- | -------------- | ----------- | ------------ |
| GET    | `/`             | `Hello world`  | `200`       | `text/plain` |
| GET    | `/good-evening` | `Good evening` | `200`       | `text/plain` |

### GET /

Returns the exact plain-text response `Hello world` with HTTP status `200`.

### GET /good-evening

Returns the exact plain-text response `Good evening` with HTTP status `200`.

## Running the Server

Start the server with Node.js:

```bash
node src/server.js
```

The server listens on the configured port (default: `3000`). Once running, the endpoints are reachable at:

- `http://localhost:3000/` → `Hello world`
- `http://localhost:3000/good-evening` → `Good evening`

You can override the port by setting the `PORT` environment variable (for example, `PORT=4000 node src/server.js`).

## Running Tests

Run the test suite in a single, non-interactive pass:

```bash
npm test
```

Run the test suite with a coverage report:

```bash
npm run test:coverage
```

The coverage report is generated in the `coverage/` directory.

## Test Coverage

This project targets **90%+** coverage across all metrics:

| Metric     | Target |
| ---------- | ------ |
| Lines      | 90%+   |
| Branches   | 90%+   |
| Functions  | 90%+   |
| Statements | 90%+   |

Coverage is enforced via the thresholds configured in `jest.config.js`. The `src/server.js` entry point is excluded from the coverage thresholds because its `.listen()` call is not directly testable without spawning a live server.

## Technology Stack

| Package   | Version  | Purpose                                     |
| --------- | -------- | ------------------------------------------- |
| Express   | 5.2.1    | Web framework for routing and HTTP handling |
| Jest      | 30.2.0   | Testing framework with built-in coverage    |
| Supertest | 7.2.2    | HTTP assertion library for endpoint testing |
| Node.js   | 20.20.0+ | JavaScript runtime environment              |
| npm       | 11.1.0+  | Package manager and script runner           |
