import js from "@eslint/js";
import pluginSonarjs from "eslint-plugin-sonarjs";
import pluginUnicorn from "eslint-plugin-unicorn";
import jestPlugin from "eslint-plugin-jest";
import globals from "globals";

export default [

  // Regras recomendadas do JavaScript
  js.configs.recommended,

  // Regras recomendadas do Jest + Jest Style (test smells)
  {
    plugins: {
      jest: jestPlugin
    },
    rules: {
      ...jestPlugin.configs.recommended.rules,
      ...jestPlugin.configs.style.rules,

      // Smells adicionais
      "jest/no-identical-title": "error",
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/expect-expect": "warn",
      "jest/no-commented-out-tests": "warn",
    }
  },

  // Regras gerais do projeto
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node, // permite require, module.exports, process
      }
    },

    plugins: {
      sonarjs: pluginSonarjs,
      unicorn: pluginUnicorn,
    },

    rules: {
      //
      // SonarJS → detecção de code smells e má complexidade
      //
      "sonarjs/no-duplicate-string": "warn",
      "sonarjs/cognitive-complexity": ["warn", 15],
      "sonarjs/no-redundant-jump": "warn",
      "sonarjs/no-identical-functions": "warn",

      //
      // Unicorn → melhores práticas modernas
      //
      "unicorn/filename-case": "off",
      "unicorn/prevent-abbreviations": "off",
      "unicorn/no-abusive-eslint-disable": "warn",
      "unicorn/no-instanceof-array": "warn",
      "unicorn/no-unreadable-array-destructuring": "warn",
    }
  },

  // Regras específicas para arquivos de teste
  {
    files: ["test/**/*.js", "**/*.test.js", "**/*.spec.js"],

    languageOptions: {
      globals: {
        ...globals.jest, // describe, test, expect, jest.fn etc.
      }
    },

    rules: {
      //
      // Relaxa regras que atrapalham testes
      //
      "sonarjs/no-duplicate-string": "off",
      "unicorn/no-array-reduce": "off",
      "unicorn/prefer-module": "off",

      //
      // Smells específicos de testes
      //
      "jest/no-identical-title": "error",
      "jest/no-disabled-tests": "warn",
      "jest/no-commented-out-tests": "warn",
      "jest/no-done-callback": "warn",
      "jest/valid-expect": "error",
      "jest/prefer-hooks-on-top": "warn",
    }
  }
];
