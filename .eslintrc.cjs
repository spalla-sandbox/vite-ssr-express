module.exports = {
  extends: '@igorjacauna/eslint-config-react',
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    // No need since use of Typescript
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        'import/extensions': 'off',
      },
    },
  ],
};
