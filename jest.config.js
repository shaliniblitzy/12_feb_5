module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'src/server.js'
  ],
  coverageThreshold: {
    global: {
      lines: 90,
      branches: 90,
      functions: 90,
      statements: 90
    }
  },
  verbose: true
};
