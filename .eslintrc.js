module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-else-return': ['error'],
    'no-param-reassign': 'off',
    'space-before-function-paren': ['error', 'always'],
    'no-restricted-syntax': ['error', 'WithStatement', 'BinaryExpression[operator=in]'],
    'vue/valid-v-for': 'off',
    'vue/no-use-v-if-with-v-for': 'off',
  },
};
