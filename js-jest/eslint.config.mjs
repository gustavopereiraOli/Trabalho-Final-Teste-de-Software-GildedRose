import js from "@eslint/js";
import pluginSonarjs from "eslint-plugin-sonarjs";
import pluginUnicorn from "eslint-plugin-unicorn";
import jestPlugin from "eslint-plugin-jest";
import globals from "globals";

export default [

  // Regras recomendadas do JS
  js.configs.recommended,

  // Regras recomendadas do Jest
  {
    plugins: {
      jest: jestPlugin
    },
    rules: {
      ...jestPlugin.configs.recommended.rules
    }
  },

  // Regras principais do projeto
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node, // permite require, module.exports, process, console
      }
    },

    plugins: {
      sonarjs: pluginSonarjs,
      unicorn: pluginUnicorn
    },

    rules: {
      // SonarJS (code smells)
      "sonarjs/no-duplicate-string": "warn",
      "sonarjs/cognitive-complexity": ["warn", 15],

      // Unicorn (boas práticas)
      "unicorn/filename-case": "off",
      "unicorn/prevent-abbreviations": "off",
    }
  },

  // Regras específicas para testes (Jest)
  {
    files: ["test/**/*.js", "**/*.test.js"],

    languageOptions: {
      globals: {
        ...globals.jest, // permite describe, test, expect
      }
    },

    rules: {
      // Desativa regras muito rígidas dentro dos testes
      "sonarjs/no-duplicate-string": "off",
      "unicorn/prefer-module": "off",
      "unicorn/no-array-reduce": "off",

      // Smells específicos
      "jest/no-identical-title": "error",
      "jest/no-disabled-tests": "warn",
      "jest/no-commented-out-tests": "warn",
      "jest/expect-expect": "warn", // exige pelo menos um expect()
    }
  }
];
