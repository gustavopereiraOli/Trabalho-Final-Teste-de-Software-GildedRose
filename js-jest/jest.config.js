module.exports = {
  // Explicitly match our test folder to avoid any sandbox discovery quirks
  testMatch: ['**/test/**/*.test.js'],
  testEnvironment: "node",
  // Ignore Stryker sandbox folders to avoid haste module collisions during mutation runs
  modulePathIgnorePatterns: ['\\.stryker-tmp', 'node_modules'],
};
