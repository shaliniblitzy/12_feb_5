/**
 * Server Entry Point
 *
 * This file is the production/development server startup module for the
 * Express application. It imports the configured Express app instance from
 * src/app.js and binds it to a network port via app.listen().
 *
 * ARCHITECTURAL NOTE (App/Server Separation Pattern):
 *   This file is intentionally thin — it exists SOLELY to separate the
 *   server startup concern (port binding) from the application configuration
 *   (routes, middleware). This separation enables Supertest in tests/app.test.js
 *   to import the app directly from src/app.js and bind to an ephemeral port
 *   during test execution, avoiding port conflicts.
 *
 * CONSTRAINTS:
 *   - This is the SOLE location for app.listen() in the entire codebase
 *   - This file must NOT re-export the app or contain any route definitions
 *   - This file must NOT define middleware or modify the app configuration
 *   - CommonJS module format (require/module.exports) is used throughout
 *
 * COVERAGE NOTE:
 *   This file is excluded from Jest coverage thresholds in jest.config.js
 *   because the .listen() call is not directly testable via Supertest.
 *   The app's route handlers are fully covered via tests/app.test.js.
 *
 * @module src/server
 */

// Import the configured Express application instance from the app module.
// The app object has all route handlers (GET /, GET /good-evening) already
// registered and is ready to accept incoming HTTP requests.
const app = require('./app');

// Define the port for the HTTP server to listen on.
// Uses the PORT environment variable if set (for deployment flexibility),
// otherwise defaults to 3000 for local development.
const PORT = process.env.PORT || 3000;

// Start the Express HTTP server by binding to the configured port.
// The callback fires once the server is successfully listening and ready
// to accept connections, logging a confirmation message to stdout.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
