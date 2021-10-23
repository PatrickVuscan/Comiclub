module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', 'prettier'],
  rules: {
    eqeqeq: 'warn',
    'prettier/prettier': 'error',
    'no-unused-vars': 'warn',
    'react/jsx-curly-brace-presence': 'warn',
    'react/no-unescaped-entities': 'warn',
    'no-use-before-define': 'off',
    'no-console': 'warn',
    'react/jsx-props-no-spreading': 'off',
    'react/display-name': 'off',
    'react/no-children-prop': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx'] }],
    'react/prop-types': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
      },
    ],
  },
  ignorePatterns: ['node_modules', 'build', 'dist', 'public'],
};
