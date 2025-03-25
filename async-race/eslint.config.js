import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  eslint.configs.recommended,
  tseslint.configs.recommended,
  eslintPluginUnicorn.configs.recommended,
  {
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "unicorn/no-array-callback-reference": "off",
    "unicorn/no-array-for-each": "off",
    "unicorn/no-array-reduce": "off",
    "unicorn/no-null": "off",
    "unicorn/number-literal-case": "off",
    "unicorn/numeric-separators-style": "off",
    "unicorn/prevent-abbreviations": [
      "error",
      {
        "allowList": {
          "acc": true,
          "env": true,
          "i": true,
          "j": true,
          "props": true,
          "Props": true
        }
      }
    ]
  }
];