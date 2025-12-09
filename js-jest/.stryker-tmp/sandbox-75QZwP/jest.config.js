// @ts-nocheck
module.exports = {
  rootDir: '.',
  testMatch: ["**/test/**/*.test.js"],
  testEnvironment: "node",
  // Ignore Stryker sandbox folders to avoid haste module collisions during mutation runs
  // Use a regex so it matches sandbox paths created by Stryker in different locations
  modulePathIgnorePatterns: ['\\.stryker-tmp', '<rootDir>/node_modules'],
  // keep other defaults
};
