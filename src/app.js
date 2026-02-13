/**
 * Express Application Module
 *
 * Creates and configures the Express application instance with route handlers.
 * This module exports the app object WITHOUT calling .listen() to enable
 * testability via Supertest — the app/server separation pattern allows
 * tests to import the app and bind to an ephemeral port without conflicts.
 *
 * Routes:
 *   GET /              — Returns "Hello world" (200)
 *   GET /good-evening  — Returns "Good evening" (200)
 *
 * @module src/app
 */

// Import Express framework (v5.x — provides routing, middleware, and HTTP capabilities)
const express = require('express');

// Create the Express application instance
const app = express();

/**
 * GET / — Root endpoint
 * Returns the plain-text response "Hello world" with a 200 status code.
 *
 * @route GET /
 * @returns {string} "Hello world"
 */
app.get('/', (req, res) => {
  res.send('Hello world');
});

/**
 * GET /good-evening — Good evening endpoint
 * Returns the plain-text response "Good evening" with a 200 status code.
 *
 * @route GET /good-evening
 * @returns {string} "Good evening"
 */
app.get('/good-evening', (req, res) => {
  res.send('Good evening');
});

// Export the app instance for use by server.js (production) and test files (Supertest).
// CRITICAL: Do NOT call app.listen() here — that responsibility belongs to server.js.
module.exports = app;
