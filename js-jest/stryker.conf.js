/**
 * Stryker configuration for the `js-jest` test project.
 *
 * Usage:
 * 1. Install dev dependencies:
 *    npm install --save-dev @stryker-mutator/core @stryker-mutator/jest-runner @stryker-mutator/javascript-mutator
 *
 * 2. Run mutation tests:
 *    npx stryker run
 *    or add a script to package.json: "stryker": "stryker run" and run `npm run stryker`
 */

/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  // Files to mutate
  mutate: [
    'src/**/*.js',
    // exclude index/entry points if present
    '!src/**/index.js'
  ],

  // Note: we avoid using the deprecated `files` property so Stryker will copy the
  // project's files into the sandbox by default. Be careful not to exclude the
  // `test` folder below, otherwise Jest will not find any tests in the sandbox.

  // Use the JavaScript mutator (built into core)
  // mutator is built into Stryker core now; no explicit setting needed

  // Test runner configuration - use local Jest so the sandbox will load the project's
  // `jest.config.js` automatically. This avoids serializing a config object that
  // was created in the host working directory.
  testRunner: 'jest',
  // Use custom projectType but point to the config file path so the sandboxed
  // environment will load the config from the copied project files.
  jest: {
    projectType: 'custom',
    configFile: 'jest.config.js',
    // Run the full test suite for each mutant (findRelatedTests=false).
    // This avoids issues where Jest's --findRelatedTests doesn't match tests
    // inside the sandboxed environment.
    enableFindRelatedTests: false
  },
  // Increase Stryker logging to help debug test discovery issues
  logLevel: 'debug',

  // Reporters to generate; 'html' gives a browsable report under .stryker-output
  reporters: ['progress', 'clear-text', 'html'],

  // Coverage analysis mode. 'perTest' gives best results if tests are small and isolated.
  // If you encounter issues with test discovery, try setting this to 'off' initially.
  coverageAnalysis: 'perTest',

  // Thresholds: adjust these to your team's quality gate
  thresholds: {
    high: 90,
    low: 70,
    break: 60
  },

  // Concurrency limits - tune for CI/Local machine
  concurrency: 2,

  // Timeouts - some mutants may slow down tests
  timeoutMS: 600000,

  // Ignore node_modules, coverage and the Stryker temp folders from being copied
  // into the sandbox. Do NOT ignore the `test` folder so Jest can execute tests.
  ignorePatterns: ['**/node_modules/**', '**/coverage/**', '**/.git/**', '**/.stryker-tmp/**']
};
