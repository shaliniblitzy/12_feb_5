/**
 * Express Application Test Suite
 *
 * Comprehensive integration and unit tests for the Express.js tutorial
 * application. Tests all HTTP endpoints using Jest and Supertest, verifying
 * response bodies, status codes, Content-Type headers, error handling, and
 * application configuration.
 *
 * Test Architecture:
 *   - Imports the Express app from ../src/app.js (without .listen() bound)
 *   - Supertest wraps the app via request(app) to create ephemeral HTTP
 *     connections per request — no real port is bound, ensuring test isolation
 *   - Each test case is independent with no shared mutable state
 *
 * Coverage Target: 100% of src/app.js (route handlers + app initialization)
 *
 * @module tests/app.test
 */

// Import Supertest for HTTP assertion testing — provides request() function
// that wraps the Express app and issues HTTP requests against it using
// ephemeral port binding (no live server needed).
const request = require('supertest');

// Import the configured Express application instance with route handlers
// (GET / and GET /good-evening) registered. The app does NOT call .listen(),
// allowing Supertest to bind to an ephemeral port for each test request.
const app = require('../src/app');

// =============================================================================
// Test Suite: GET / — Hello world endpoint
// =============================================================================

describe('GET /', () => {
  it('should return 200 status code', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
  });

  it('should return Hello world in response body', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Hello world');
  });

  it('should return correct Content-Type header', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    // Express res.send() with a string sets Content-Type to text/html by default.
    // Verify the header contains either text/html or text/plain.
    const contentType = res.headers['content-type'];
    expect(contentType).toBeDefined();
    const isValidContentType =
      contentType.includes('text/html') || contentType.includes('text/plain');
    expect(isValidContentType).toBe(true);
  });

  it('should return Hello world with query parameters', async () => {
    // Edge case: query parameters on the root route should not affect the response.
    const res = await request(app).get('/?key=value&another=param');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Hello world');
  });
});

// =============================================================================
// Test Suite: GET /good-evening — Good evening endpoint
// =============================================================================

describe('GET /good-evening', () => {
  it('should return 200 status code', async () => {
    const res = await request(app).get('/good-evening');
    expect(res.status).toBe(200);
  });

  it('should return Good evening in response body', async () => {
    const res = await request(app).get('/good-evening');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Good evening');
  });

  it('should return correct Content-Type header', async () => {
    const res = await request(app).get('/good-evening');
    expect(res.status).toBe(200);
    // Express res.send() with a string sets Content-Type to text/html by default.
    // Verify the header contains either text/html or text/plain.
    const contentType = res.headers['content-type'];
    expect(contentType).toBeDefined();
    const isValidContentType =
      contentType.includes('text/html') || contentType.includes('text/plain');
    expect(isValidContentType).toBe(true);
  });
});

// =============================================================================
// Test Suite: 404 handling — Undefined route tests
// =============================================================================

describe('404 handling', () => {
  it('should return 404 for non-existent routes', async () => {
    const res = await request(app).get('/nonexistent');
    expect(res.status).toBe(404);
  });

  it('should return 404 for deeply nested non-existent routes', async () => {
    const res = await request(app).get('/this/route/does/not/exist');
    expect(res.status).toBe(404);
  });
});

// =============================================================================
// Test Suite: Unsupported HTTP methods — Method validation tests
// =============================================================================

describe('Unsupported HTTP methods', () => {
  it('should return 404 or 405 for POST /', async () => {
    // POST is not defined for the root route — Express should respond
    // with 404 (no matching route) or 405 (method not allowed).
    const res = await request(app).post('/');
    expect(res.status === 404 || res.status === 405).toBe(true);
  });

  it('should return 404 or 405 for PUT /good-evening', async () => {
    // PUT is not defined for /good-evening — Express should respond
    // with 404 (no matching route) or 405 (method not allowed).
    const res = await request(app).put('/good-evening');
    expect(res.status === 404 || res.status === 405).toBe(true);
  });

  it('should return 404 or 405 for DELETE /good-evening', async () => {
    // DELETE is not defined for /good-evening — Express should respond
    // with 404 (no matching route) or 405 (method not allowed).
    const res = await request(app).delete('/good-evening');
    expect(res.status === 404 || res.status === 405).toBe(true);
  });
});

// =============================================================================
// Test Suite: Express app configuration — App instance validation
// =============================================================================

describe('Express app configuration', () => {
  it('should export a valid Express app instance', () => {
    // An Express app is a callable function that also has
    // .get(), .use(), and .listen() methods attached to it.
    expect(app).toBeDefined();
    expect(typeof app).toBe('function');
    expect(typeof app.get).toBe('function');
    expect(typeof app.use).toBe('function');
    expect(typeof app.listen).toBe('function');
  });

  it('should be a valid Node.js module', () => {
    // Verify that the module can be required without errors and returns
    // a non-null, non-undefined value (the Express app instance).
    const importedApp = require('../src/app');
    expect(importedApp).toBeDefined();
    expect(importedApp).not.toBeNull();
    // The same app instance should be returned on subsequent requires
    // (Node.js module caching behavior).
    expect(importedApp).toBe(app);
  });
});
