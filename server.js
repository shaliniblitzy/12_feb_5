/**
 * server.js — Express application entry point
 * -------------------------------------------------------------------------
 * Minimal Node.js + Express HTTP service for the "12_feb_5" tutorial project.
 *
 * This single file hosts ONE Express application instance, registers TWO
 * read-only `GET` route handlers, and starts an HTTP listener. It is the entry
 * point referenced by package.json (`main` = "server.js", `npm start` =
 * "node server.js").
 *
 * Requirements implemented (see Agent Action Plan §0.1.4, §0.3.1, §0.3.5):
 *   R1 — Adopt Express.js as the HTTP/routing layer.
 *   R2 — Baseline endpoint: GET /            -> "Hello world".
 *   R3 — New feature endpoint: GET /good-evening -> "Good evening".
 *   R4 — Runnable server bound to process.env.PORT || 3000.
 *
 * Design notes:
 *   - CommonJS module style (`require`) is used because package.json declares
 *     no `"type": "module"`.
 *   - The two routes are independent and registered on distinct paths so both
 *     greetings are reachable simultaneously; the change is strictly additive
 *     and the root route is never shadowed or replaced.
 *   - Responses are sent as exact plaintext via `res.send(<string>)`, which
 *     yields HTTP 200 with `Content-Type: text/html; charset=utf-8` and no
 *     decoration (no JSON wrapping, no trailing newline appended to the body).
 */

'use strict';

// R1 — Import the Express web framework (resolved from node_modules; declared
// as the sole runtime dependency, express ^5.2.1, in package.json).
const express = require('express');

// Instantiate exactly one Express application instance.
const app = express();

// Listening port: honor the PORT environment variable for portability,
// defaulting to the conventional tutorial port 3000 when it is unset.
const PORT = process.env.PORT || 3000;

// R2 — Baseline endpoint. Responds to `GET /` with the exact plaintext
// string "Hello world". Preserved verbatim; this behavior is never altered.
app.get('/', (req, res) => {
  res.send('Hello world');
});

// R3 — New feature endpoint. Responds to `GET /good-evening` with the exact
// plaintext string "Good evening" on a route distinct from the root, so it
// coexists with (and does not shadow) the baseline endpoint above.
app.get('/good-evening', (req, res) => {
  res.send('Good evening');
});

// R4 — Start the HTTP listener AFTER both routes are registered, so both
// endpoints are bound and reachable as soon as the server accepts connections.
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
