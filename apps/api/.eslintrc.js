module.exports = {
  extends: ['../../.eslintrc.js', 'plugin:@nestjs/recommended'],
  overrides: [
    {
      files: ['src/tracing.ts'],
      rules: {
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
      },
    },
  ],
}
