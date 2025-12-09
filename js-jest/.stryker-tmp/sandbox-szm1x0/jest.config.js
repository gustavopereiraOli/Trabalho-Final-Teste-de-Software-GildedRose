// @ts-nocheck
module.exports = {
  // Use Jest's default test discovery regex to be compatible with Stryker sandbox layout
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.js$",
  testEnvironment: "node",
  // Ignore Stryker sandbox folders to avoid haste module collisions during mutation runs
  modulePathIgnorePatterns: ['\\.stryker-tmp', 'node_modules'],
};
