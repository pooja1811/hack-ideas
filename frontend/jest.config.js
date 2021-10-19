module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/src/**/**/*.vue",
    "<rootDir>/src/**/**/*.js",
  ],
  preset: "@vue/cli-plugin-unit-jest",
  setupFiles: ["<rootDir>/tests/test-setup.js"],
  testMatch: [`<rootDir>/src/**/**/*.spec.js`],
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
};
