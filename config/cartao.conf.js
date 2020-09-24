const url = require('../mock/url.mock.json').HOMOLOG

module.exports = {
    bail: 1,
    clearMocks: true,
    globals: {
      url
    },
    reporters: [
      "default"
    ],
    roots: [
      "../specs/"
    ],
    testEnvironment: "node",
    testMatch: [
      "**/specs/cartao/*.spec.js?(x)"
    ],
    testPathIgnorePatterns: [
      "../node_modules/",
    ],
  };