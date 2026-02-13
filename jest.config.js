/**
 * Jest Configuration for Express.js Tutorial Project
 *
 * This configuration file defines how Jest discovers, runs, and reports
 * on tests for the Node.js Express application. It is tailored for
 * server-side testing using Supertest (no DOM/browser environment needed).
 *
 * Key design decisions:
 * - Uses 'node' test environment since this is a server-side Express app
 * - Targets test files in the tests/ directory following *.test.js naming
 * - Enforces 90% minimum coverage thresholds for production quality
 * - Excludes src/server.js from coverage because its .listen() call
 *   cannot be directly tested via Supertest without port conflicts
 * - Uses CommonJS module format consistent with the rest of the project
 */
module.exports = {
  // Use Node.js environment for Express server testing.
  // The 'node' environment provides a Node.js-like runtime without
  // DOM APIs (window, document, etc.), which are unnecessary for
  // testing HTTP endpoints via Supertest.
  testEnvironment: 'node',

  // Define the pattern Jest uses to discover test files.
  // This matches any file ending in .test.js within the tests/ directory
  // (or any nested subdirectory), supporting the project's convention
  // of placing all test files under the top-level tests/ folder.
  testMatch: ['**/tests/**/*.test.js'],

  // Automatically collect code coverage information during test runs.
  // When enabled, Jest instruments the source code and tracks which
  // lines, branches, functions, and statements are exercised by tests.
  collectCoverage: true,

  // Directory where Jest writes coverage report files.
  // Reports are generated in multiple formats (text, lcov, clover)
  // and stored in the coverage/ folder at the project root.
  coverageDirectory: 'coverage',

  // Patterns for files to exclude from coverage measurement.
  // src/server.js is excluded because it contains the app.listen() call
  // which binds to a real port at startup. Testing this directly would
  // cause port conflicts when Supertest creates ephemeral connections.
  // The server.js module is intentionally thin (imports app, calls listen)
  // and its functionality is validated indirectly through app.js tests.
  // node_modules is excluded by default but listed explicitly for clarity.
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'src/server.js'
  ],

  // Enforce minimum coverage thresholds globally.
  // If any metric falls below 90%, Jest will fail the test run.
  // This ensures that all route handlers, middleware, and application
  // initialization logic in src/app.js maintain comprehensive test coverage.
  // The 90% threshold is appropriate for this minimal Express application
  // where near-complete coverage is readily achievable.
  coverageThreshold: {
    global: {
      lines: 90,
      branches: 90,
      functions: 90,
      statements: 90
    }
  },

  // Enable verbose output to display individual test case results.
  // Each describe block and it block will show its pass/fail status,
  // making it easier to identify exactly which test cases succeed or fail.
  // This is especially useful for tutorial/educational projects where
  // clear, readable test output aids learning.
  verbose: true
};
