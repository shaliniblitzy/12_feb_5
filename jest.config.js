/**
 * Jest configuration for the Node.js + Express tutorial server.
 *
 * This file tells Jest how to discover, execute, and measure the test suite for
 * the project's two HTTP endpoints (`GET /` -> "Hello world" and
 * `GET /good-evening` -> "Good evening"). The tests drive the exported Express
 * application with Supertest, so no browser/DOM environment is required.
 *
 * The configuration is written in CommonJS (`module.exports = { ... }`) to stay
 * consistent with the rest of the codebase, which uses `require` /
 * `module.exports` throughout. Jest automatically discovers this file at the
 * project root, so both `npm test` and `npm run test:coverage` pick it up
 * without any extra flags.
 *
 * @see https://jestjs.io/docs/configuration
 * @type {import('jest').Config}
 */
module.exports = {
  // Run tests in a plain Node.js environment rather than a browser-like jsdom
  // environment. The server under test is headless HTTP code with no DOM, so
  // the lighter `node` environment is both correct and faster.
  testEnvironment: 'node',

  // Discover every `*.test.js` file located anywhere beneath a top-level
  // `tests/` directory. This matches the project's `tests/app.test.js` suite
  // while ignoring unrelated files elsewhere in the tree.
  testMatch: ['**/tests/**/*.test.js'],

  // Always gather code-coverage information when the suite runs. Enabling this
  // here means coverage is collected for plain `npm test` as well as
  // `npm run test:coverage`, keeping the enforced thresholds (below) honest.
  collectCoverage: true,

  // Write the generated coverage report (HTML, lcov, text summary, etc.) into a
  // top-level `coverage/` directory.
  coverageDirectory: 'coverage',

  // Exclude paths from coverage measurement:
  //   - '/node_modules/' : third-party dependencies are never our concern.
  //   - 'src/server.js'  : the thin entry point only calls `app.listen()`,
  //                        which binds a real port and cannot be exercised by
  //                        Supertest without port conflicts. Excluding it
  //                        focuses coverage on the testable application logic
  //                        in `src/app.js`.
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'src/server.js'
  ],

  // Enforce a strict quality bar: the run FAILS if any metric drops below 90%.
  // Because `src/server.js` is excluded above, these thresholds effectively
  // gate the route/handler logic in `src/app.js`.
  coverageThreshold: {
    global: {
      lines: 90,
      branches: 90,
      functions: 90,
      statements: 90
    }
  },

  // Print an individual, readable line for each test as it runs. This verbose
  // output is especially helpful for a tutorial project, where seeing each
  // assertion pass clarifies what is being verified.
  verbose: true
};
