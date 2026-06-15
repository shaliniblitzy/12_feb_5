# 12_feb_5

A minimal Node.js HTTP service built with the [Express.js](https://expressjs.com/) web framework. It exposes two plaintext greeting endpoints — `Hello world` and `Good evening`.

## Prerequisites

- [Node.js](https://nodejs.org/) `>= 18` — Express 5 declares `engines.node >= 18`.
- npm — bundled with Node.js.

> Built and verified with Node.js v20.20.2 and npm 10.8.2.

## Installation

Install the project dependencies:

```bash
npm install
```

This resolves the `express` dependency declared in `package.json` into `node_modules/`, using (and writing) `package-lock.json` for reproducible installs.

## Running

Start the server:

```bash
npm start
```

This runs `node server.js` (the `start` script defined in `package.json`). The server listens on `process.env.PORT || 3000`, so by default it is reachable at `http://localhost:3000/`.

## Endpoints

| Method | Path | Response |
|--------|------|----------|
| `GET` | `/` | `Hello world` |
| `GET` | `/good-evening` | `Good evening` |

For example, request the "Good evening" endpoint with `curl`:

```bash
curl http://localhost:3000/good-evening
```
