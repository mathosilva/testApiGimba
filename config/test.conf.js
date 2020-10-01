const url = require('../mock/url.mock.json').HOMOLOG

module.exports = {
    bail: 1,
    clearMocks: true,
    globals: {
      url
    },
    reporters: [
    //   "default",
    // ["jest-html-reporter", {
    //     "pageTitle": "API Gimba Test"
    // }]
    "default",
    [
      "jest-stare",
      {
        "resultDir": "results/jest-stare",
        "reportTitle": "Gimba API Test",
        "additionalResultsProcessors": [
          "jest-junit"
        ],
        "coverageLink": "../../coverage/lcov-report/index.html",
        "jestStareConfigJson": "jest-stare.json",
        "jestGlobalConfigJson": "globalStuff.json"
      }
    ]
    ],
    roots: [
      "../specs/"
    ],
    testEnvironment: "node",
    testMatch: [
      "**/specs/**/*.spec.js?(x)"
    ],
    testPathIgnorePatterns: [
      "../node_modules/",
    ],
  };