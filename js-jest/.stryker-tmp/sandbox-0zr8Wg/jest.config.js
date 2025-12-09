// @ts-nocheck
module.exports = {
  rootDir: '.',
  testMatch: ["**/test/**/*.test.js"],
  testEnvironment: "node",
  // Ignore Stryker sandbox folders to avoid haste module collisions during mutation runs
  modulePathIgnorePatterns: ['<rootDir>/.stryker-tmp'],
  // keep other defaults
};
